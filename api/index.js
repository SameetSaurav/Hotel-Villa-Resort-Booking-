import express, { json } from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import Jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser"
import imageDownloader from 'image-downloader'

import { User } from "./models/User.model.js"
import { Place } from "./models/Place.model.js"
import { Booking } from "./models/Booking.model.js"

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { upload } from "./multer.js"
import {uploadOnCloudinary} from './cloudinary.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config()

const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)
const tokenSecret = process.env.TOKEN_SECRET

app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(cors({
    origin: process.env.ORIGIN_PATH,
    credentials: true
}))

mongoose.connect(process.env.MONGO_URL)
console.log("db connected successfully")

async function getUserFromReq(req){
    return new Promise((resolve, reject) => {
        Jwt.verify(req.cookies.token, tokenSecret, {}, async (err, user) => {
            if(err) throw err;
            resolve(user)
        })
    })
}

app.get("/test", (req, res) => {
    res.json("test ok")
})


//Register endpoint
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })

        res.json(user)

    } catch (error) {
        res.json(error)
    }
})


//Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (isPasswordCorrect) {
            Jwt.sign({ email: user.email, id: user._id }, tokenSecret, {}, (error, token) => {
                if (error) {
                    throw error
                } else {
                    res.cookie('token', token).json(user)
                }
            })
        } else {
            res.status(422).json("password incorrect")
        }

    } else {
        res.json("user not found")
    }
})

//Profile endpoint
app.get("/profile", (req, res) => {
    const { token } = req.cookies
    if (token) {
        Jwt.verify(token, tokenSecret, {}, async (err, user) => {
            if (err) throw err
            const { name, email, _id } = await User.findById(user.id)
            res.json({ name, email, _id });
        })
    } else {
        res.json(null)
    }

})

//Logout endpoint
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body
    const newName = 'photo' + Date.now() + ".jpeg"

    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)
})

app.post('/upload', upload.array('photos',100), async (req,res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++){
        const photosLocalPath = req?.files[i]?.path;
        const photos = await uploadOnCloudinary(photosLocalPath)
        
        uploadedFiles.push(photos.url)
    }
    res.json(uploadedFiles)
})



app.post('/places', (req, res) => {
    const { token } = req.cookies
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

    if(token){

        Jwt.verify(token, tokenSecret, {}, async (err, user) => {
            if (err) throw err
    
            const placeDoc = await Place.create({
                owner: user.id,
                title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            res.json(placeDoc)
        })
    }
})

app.get('/user-places', (req,res) => {
    const { token } = req.cookies

    Jwt.verify(token, tokenSecret, {}, async (err, user) => {
        const {id} = user

        res.json(await Place.find({owner:id}))
    })
})

app.get('/places/:id', async (req,res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

app.put('/places', async (req,res) => {
    const { token } = req.cookies
    const { id,title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

    Jwt.verify(token, tokenSecret, {}, async (err, user) => {
        if(err) throw err

        const place = await Place.findById(id)
        if(user.id === place.owner.toString()){
            place.set({
                title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await place.save()
            res.json('ok')
        }
    })
})

app.get('/places', async (req,res) => {
    res.json(await Place.find())
})

app.post('/bookings', async (req,res) => {
    const userData = await getUserFromReq(req)
    const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body

    const booking = await Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price, user: userData.id
    })

    res.json(booking)
})



app.get('/bookings', async (req,res) => {
    const userData = await getUserFromReq(req)

    res.json(await Booking.find({user: userData.id}).populate("place"))
})


app.listen(4000)
