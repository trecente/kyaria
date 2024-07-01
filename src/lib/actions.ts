"use server";

import { del } from "@vercel/blob";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import path from "path";

import { lucia, validateRequest } from "@/lib/auth";
import {
  EmailAlreadyInUseError,
  InvalidCredentialsError,
  PostJobError,
  SignInError,
  SignInRequiredError,
  SignOutError,
  SignUpError,
  UnknownError,
  ValidationError,
} from "@/lib/exceptions";
import { getUserByEmail } from "@/lib/fetchers";

import { prisma } from "./prisma";
import {
  createJobSchema,
  filterSchema,
  signInFormSchema,
  signUpFormSchema,
} from "./schemas";
import { toSlug, uploadCompanyLogo } from "./utils";

/**
 * Filters jobs.
 */
export async function filterJobs(formData: FormData): Promise<string> {
  const validatedFields = filterSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  const { q, location, work, employment } = validatedFields;

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(location !== "All" && { location }),
    ...(work !== "Any" && { work }),
    ...(employment !== "Any" && { employment }),
  });

  return searchParams.toString();
}

/**
 * Creates a new job.
 */
export async function createJob(formData: FormData): Promise<void> {
  const validatedFields = createJobSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    throw new ValidationError();
  }

  const {
    title,
    description,
    companyName,
    companyLogo,
    employment: type,
    location,
    work: locationType,
    salary,
    education,
    experience,
    applicationEmail,
    applicationUrl,
  } = validatedFields.data;

  const slug = `${toSlug(title, companyName)}-${nanoid(10)}`;
  const formattedSalary = salary.replace(/[$,]/g, "");

  let companyLogoUrl: string | undefined;

  if (companyLogo) {
    const logoPath = `company_logos/${slug}${path.extname(companyLogo.name)}`;

    const url = await uploadCompanyLogo(logoPath, companyLogo);

    companyLogoUrl = url;
  }

  try {
    await prisma.job.create({
      data: {
        slug,
        title: title.trim(),
        type,
        location,
        locationType,
        education,
        experience,
        companyName: companyName.trim(),
        companyLogo: companyLogoUrl,
        applicationEmail: applicationEmail?.trim(),
        applicationUrl: applicationUrl?.trim(),
        description: description.trim(),
        salary: parseInt(formattedSalary),
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }

    if (error instanceof Error) {
      if (companyLogoUrl) {
        await del(companyLogoUrl);
      }

      throw new PostJobError();
    }

    throw new UnknownError();
  }
}

/**
 * Sign in.
 */
export async function signIn(formData: FormData): Promise<void> {
  const validatedFields = signInFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    throw new ValidationError();
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await getUserByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const passwordMatch = await new Argon2id().verify(user.password, password);

    if (!passwordMatch) throw new InvalidCredentialsError();

    const session = await lucia.createSession(user.id, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (error instanceof (InvalidCredentialsError || ValidationError)) {
      throw error;
    }

    if (error instanceof Error) {
      throw new SignInError();
    }

    throw new UnknownError();
  }
}

/**
 * Sign up.
 */
export async function signUp(formData: FormData): Promise<void> {
  const validatedFields = signUpFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    throw new ValidationError();
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) throw new EmailAlreadyInUseError();

    const hashedPassword = await new Argon2id().hash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (error instanceof (EmailAlreadyInUseError || ValidationError)) {
      throw error;
    }

    if (error instanceof Error) {
      throw new SignUpError();
    }

    throw new UnknownError();
  }
}

/**
 * Sign out.
 */
export async function signOut(): Promise<void> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new SignInRequiredError();
    }

    await lucia.invalidateUserSessions(session.userId);
    await lucia.deleteExpiredSessions();

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (error instanceof SignInRequiredError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new SignOutError();
    }

    throw new UnknownError();
  }
}
