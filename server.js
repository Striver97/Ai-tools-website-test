// 引入 express 框架
const express = require("express")

// 创建服务器
const app = express()

// 允许服务器读取 JSON 数据
app.use(express.json())

// 允许访问当前文件夹里的网页
app.use(express.static(__dirname))

// 引入 axios （用于请求AI接口）
const axios = require("axios")

// 你的通义千问 API KEY
const API_KEY = "sk-230446ab647c455282c1df3ce1c34d27"

// 创建聊天接口
app.post("/api/chat", async (req, res) => {

    try {

        // 获取用户发送的消息
        const message = req.body.message

        // 请求通义千问AI
        const response = await axios.post(
            "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
            {
                model: "qwen-plus",
                input: {
                    prompt: message
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        )

        // 获取AI回复
        const reply = response.data.output.text

        // 返回给前端
        res.json({ reply: reply })

    } catch (error) {

        console.log(error)

        res.json({
            reply: "AI暂时不可用"
        })

    }

})

// 启动服务器
app.listen(3000, () => {

    console.log("服务器运行：http://localhost:3000")

})