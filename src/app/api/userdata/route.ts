import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma= new PrismaClient()
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log("email", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const gotuser=await prisma.user.findFirst({
        where:{
            email:email
        },
        include:{
            promptHistory:true
        }
        })
    console.log("gotuser",gotuser)
    return NextResponse.json(gotuser)
  } catch (error) {
    console.error("Error getting details:", error);
    return NextResponse.json(
      { error: "Failed to get details" },
      { status: 500 }
    );
  }
}
