'use server';

import { eq } from 'drizzle-orm';
import { signIn } from '@/auth';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { hash } from 'bcryptjs';

export const signInWithCredentials = async (
  // eslint-disable-next-line no-undef
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { error?: any } = await signIn('credentials', {
      email,
      password,
      redirect: true,
    });

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error(error, 'sign in error');
    return {
      success: false,
      error: 'Sign in error',
    };
  }
};

// eslint-disable-next-line no-undef
export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;

  // const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
  // const { success } = await ratelimit.limit(ip);

  // if (!success) return redirect('/too-fast');

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: 'User already exists' };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    // await workflowClient.trigger({
    //   url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
    //   body: {
    //     email,
    //     fullName,
    //   },
    // });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, 'Signup error');
    return { success: false, error: 'Signup error' };
  }
};
