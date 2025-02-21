import { NextRequest, NextResponse } from "next/server";

export async function GET(requrest: NextRequest) {
  return NextResponse.json(
    {
      operation_code: 1,
    },
    { status: 200 }
  );
}

function isValidInput(str: string) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

export async function POST(request: NextRequest) {
  try {
    const { data }: { data: string[] } = await request.json();

    // ✅ Stop execution if any item is invalid
    for (const str of data) {
      if (!isValidInput(str)) {
        return NextResponse.json(
          {
            is_success: false,
            message: "Invalid Data - Only Alphanumeric Allowed",
          },
          { status: 400 }
        );
      }
    }

    // ✅ Correct filtering of numbers and alphabets
    const numbers = data.filter((item) => /^\d+$/.test(item)); // Only digits
    const alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item)); // Only letters

    // ✅ Find highest alphabet (case insensitive)
    let highest_alphabet: string[] = [];
    if (alphabets.length > 0) {
      highest_alphabet = [
        alphabets.reduce((max, current) =>
          current.toLowerCase() > max.toLowerCase() ? current : max
        ),
      ];
    }

    return NextResponse.json({
      is_success: true,
      user_id: "sarthak_gaikwad_30122003",
      email: "22bcs16863@cuchd.in",
      roll_number: "22bcs16863",
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        is_success: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
