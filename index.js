import express from "express"

const app = express()


let PORT = process.env.PORT || 8000;


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.json({message:"succes "})
})

app.get('/me', (req, res) => {
    res.json({name:"habib "})
})