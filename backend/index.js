    const express  = require('express')
    require('dotenv').config()
    const bodyparser = require('body-parser')



    const app = express()

    app.use(express.json())
    app.use(bodyparser.json())



    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    async function GenText(prompt) {
        try {
        const result = await model.generateContent(prompt);
         return result.response.text()
        } catch (error) {
        console.log(error)
        }
    }
    app.post('/api/question',async(req,res)=>{

        try {
            let data = req.body.question;
            if (!data) {
              return res.status(400).json({ error: 'Question is required' });
            }
        
            let result = await GenText(data)
            
            
                res.json({result})
        
        
        } catch (error) {
            console.log(error)
        }
    

    })


    app.listen(3006,()=>console.log('server live on 3006'))