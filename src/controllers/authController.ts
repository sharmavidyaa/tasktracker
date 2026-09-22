import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

async function signup(req: Request, res: Response){
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    try{
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    const user = await User.create({email, password: hashed, name});

        if(user){
            res.status(200).json({message:"User Created"});
        }
    }
    catch{
        res.status(500).json({message: "try later, couldn't sign up"});

    }
}