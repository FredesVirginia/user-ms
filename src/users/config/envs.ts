
import 'dotenv/config';
import * as joi from "joi";

interface EnvVars{
   
    DB_HOST: string;
    DB_PORT: number;
    DB_USER:string;
    DB_PASSWORD:string;
    DB_NAME:string;
   
}

const envsShema = joi.object({
  
   
    DB_HOST:joi.string().required(),
    DB_PORT:joi.number().required(),
    DB_USER:joi.string().required(),
    DB_PASSWORD:joi.string().required(),
    DB_NAME:joi.string().required(),
   
}).unknown(true);

const { error , value } = envsShema.validate({
    ...process.env,
    NATS_SERVERS : process.env.NATS_SERVERS?.split(",")
});

if(error){
    throw new Error (`Config validation errors ${ error.message}`)
}

const envVars : EnvVars = value;

export const envs = {
    port : envVars.DB_PORT,
    dbHost: envVars.DB_HOST,
    dbName : envVars.DB_NAME,
    dbPassword: envVars.DB_PASSWORD,
    dbUser: envVars.DB_USER
   
}