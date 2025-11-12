import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {oldPassword, newPassword, token} = reqBody;

        if(!token) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if(!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        const isValidOldPassword = await bcryptjs.compare(oldPassword, user.password);

        if(!isValidOldPassword) {
            return NextResponse.json({error: "Invalid old password"}, {status: 400})
        }

        const encryptedNewPassword = await bcryptjs.hash(newPassword, 10);

        user.password = encryptedNewPassword;
        await user.save();

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password Reset Successfully",
            success: true
        })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}