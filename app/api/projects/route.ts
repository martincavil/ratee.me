import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/supabase/queries';
import { createProjectSchema } from '@/lib/validators';
import type { ApiResponse } from '@/types/api';
import type { Project } from '@/types/database';

/**
 * GET /api/projects
 * List all projects for authenticated user
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params = {
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
      status: searchParams.get('status') || undefined,
      sortBy: (searchParams.get('sort') as 'created_at' | 'delivery_date' | 'name') || 'created_at',
      order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
    };

    const result = await getProjects(params);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create a new project
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = createProjectSchema.parse(body);

    const project = await createProject(validated);

    const response: ApiResponse<{ project: Project }> = {
      success: true,
      data: { project },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
