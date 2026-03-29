📌 Pear Media AI
🚀 Live Demo

🌐 https://pearmedia-ai-prototype-prem.vercel.app/

🔗 https://github.com/premkumarjp45/pearmedia-ai-prototype.git

🧠 Overview

Pear Media AI is a React-based web app that allows users to:

✍️ Generate enhanced prompts from text
🎨 Create AI-generated images
🖼️ Analyze uploaded images using AI
⚡ Features
🔹 Creative Studio
Enter text ideas
Enhance prompts using AI
Generate images
🔹 Style Lab
Upload images
Analyze:
Objects (caption)
Colors
Style
🧩 Components
Navbar.js
Navigation between tabs
Responsive (mobile + desktop)
WorkflowText.js
Text input
Prompt enhancement
Image generation
WorkflowImage.js
Image upload
Image analysis
Display results
🤖 API Functions (apiHelpers.js)
getEnhancedPrompt() → Enhances text
generateImage() → Generates images
analyzeImage() → Uses Hugging Face BLIP for image captioning
🧠 AI Models Used
🤖 Prompt Enhancement → LLM
🎨 Image Generation → Diffusion Model
🖼️ Image Captioning → Hugging Face (BLIP)
🎨 Libraries Used
⚛️ React.js
🎨 Tailwind CSS
🔄 Context API
⏳ react-loader-spinner → Loading indicators
🔔 react-toastify → Notifications
🤖 Hugging Face API
⚙️ Setup
1️⃣ Clone Repo
git clone https://github.com/premkumarjp45/pearmedia-ai-prototype.git
cd pearmedia-ai-prototype
2️⃣ Install Dependencies
npm install
3️⃣ Environment Variables

Create a .env file:

REACT_APP_HF_TOKEN=your_huggingface_token
4️⃣ Run Project
npm start

App runs at 👉 http://localhost:3000

👨‍💻 Author

Prem Kumar JP 
💼 LinkedIn → https://www.linkedin.com/in/jppremkumar/  
🧑‍💻 LeetCode → https://leetcode.com/u/jppremkumar/  
🌐 Portfolio → https://jppremkumar.vercel.app/  