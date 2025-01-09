const express=require('express');
const CryptoJS=require('crypto-js');
const cors=require('cors');

 const decryptedData=(Data)=>{
    const inckey = `iWUiG0QjOD2LJBZMN5ECDw==`
    const key = CryptoJS.enc.Utf8.parse(inckey)
    const iv = CryptoJS.enc.Utf8.parse("ASDDSADR")
    const cipertext = CryptoJS.TripleDES.decrypt(Data, key, { mode: CryptoJS.mode.CBC, iv: iv })
    const Decrypted = cipertext.toString(CryptoJS.enc.Utf8);
    return Decrypted
}
const encryptData=(Data)=>{
    const inckey = `iWUiG0QjOD2LJBZMN5ECDw==`
    const key = CryptoJS.enc.Utf8.parse(inckey)
    const iv = CryptoJS.enc.Utf8.parse("ASDDSADR")
    const encoded = CryptoJS.enc.Utf8.parse(Data)
    const Encrypted = CryptoJS.TripleDES.encrypt(encoded, key, { mode: CryptoJS.mode.CBC, iv: iv }).toString()
    return Encrypted
}
const MockData=[
    {id:1,name:"John",age:30},
    {id:2,name:"Doe",age:40},
    {id:3,name:"Smith",age:50},
    {id:4,name:"Alex",age:60},
    {id:5,name:"Bob",age:70},
]
const app=express();
app.use(cors());
const port=5000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello World');
});
const encryptedEndpoint = encryptData('MyApiData');
app.get(`/api/${encryptedEndpoint}`,(req,res)=>{
    res.send(encryptData(JSON.stringify(MockData)));
});
app.post('/api/data',(req,res)=>{
    const body=decryptedData(req.body);
    console.log(body);
    res.send('Hello World');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
