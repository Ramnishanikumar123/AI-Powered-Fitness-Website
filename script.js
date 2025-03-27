let select = document.querySelector(".select-heading")
let arrow = document.querySelector(".select-heading img")
let options = document.querySelector(".options")

let option = document.querySelectorAll(".option")
let selecttext = document.querySelector(".select-heading span")






select.addEventListener("click", () =>{
    options.classList.toggle("active-options")
    arrow.classList.toggle("rotate")

})


option.forEach((item)=>{
    item.addEventListener("click", ()=>{
        selecttext.innerText =  item.innerText;
    })
})



// Chat Bot

let prompt = document.querySelector(".prompt")
let chatbtn = document.querySelector(".input-area button")
let chatContainer = document.querySelector(".chat-container")
let h1 = document.querySelector(".h1")
let chatimg = document.querySelector("#chatbotimg")
let chatbox = document.querySelector(".chat-box")
let userMessage = "";

chatimg.addEventListener("click",()=>{
    chatbox.classList.toggle("active-chat-box")
    if(chatbox.classList.contains("active-chat-box")){
        chatimg.src="cross.svg"
    }
    else{
        chatimg.src="chatbot.svg"

    }


})


let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDg_C9hVfzfaS7_TpiztDbjsxXK9Dqd0Zo"


async function generateApiResponse(aiChatBox){
    const textElement =aiChatBox.querySelector(".text")
    try{
        const response = await fetch(Api_url,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                contents:[{
                    "role": "user",
                    "parts": [{text:`${userMessage} in 10 words`}]
                }]
            })
        })
        const data = await response.json()
        const apiResponse = data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText = apiResponse
    }
        catch(error){
            console.log(error)
        }
        finally{
            aiChatBox.querySelector(".loading").style.display="none"
        }
    
}

function createChatBox(html,className){
    const div= document.createElement("div")
    div.classList.add(className)
    div.innerHTML = html;
    return div
}

function showLoading(){
    const html = `<p class="text"></p>
        <img src="img/load.gif" class="loading" width=" 50px">`
        
    let aiChatBox = createChatBox(html, "ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateApiResponse(aiChatBox)
}

chatbtn.addEventListener("click", () =>{
    h1.style.display="none"
    userMessage = prompt.value;
    const html = `<p class="text"></p> `

    let userChatBox = createChatBox(html, "user-chat-box")
    userChatBox.querySelector(".text").innerText= userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value=""
    setTimeout(showLoading,500)
})



//virtual Assistant

let ai = document.querySelector(".virtual-assistant img")
let speakpage = document.querySelector(".speak-page")
let content = document.querySelector(".speak-page h1")






function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 5;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}


let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    speakpage.style.display="none";

    let currrentIndex = event.resultIndex
    let transcript = event.results[currrentIndex][0].transcript
    content.innerText= transcript
    takeCommand(transcript.toLowerCase())
    console.log(event)

}
function takeCommand(message){
    if(message.includes("open") && message.includes("chat")){
        speak("okay Sir")
        chatbox.classList.toggle("active-chat-box")

    }else if(message.includes("close") && message.includes("chat")){
        speak("okay sir")
        chatbox.classList.remove("active-chat-box")
    }
    else if(message.includes("back")){
        speak("okay sir")
        window.open("file:///C:/Users/kumar/OneDrive/Desktop/AI%20Fitness/back.html","_self")

    }
    else if(message.includes("chest")){
        speak("okay sir")
        window.open("file:///C:/Users/kumar/OneDrive/Desktop/AI%20Fitness/chest.html","_self")

    }
    else if(message.includes("leg")){
        speak("okay sir")
        window.open("file:///C:/Users/kumar/OneDrive/Desktop/AI%20Fitness/leg.html","_self")

    }
    else if(message.includes("biceps") || message.includes("triceps")){
        speak("okay sir")
        window.open("file:///C:/Users/kumar/OneDrive/Desktop/AI%20Fitness/biceps-triceps.html","_self")

    }
    else if(message.includes("shoulder")){
        speak("okay sir")
        window.open("file:///C:/Users/kumar/OneDrive/Desktop/AI%20Fitness/shoulder.html","_self")

    }
    else if(message.includes("home")){
        speak("okay sir")
        window.open("file:///C:/Users/kumar/OneDrive/Desktop/AI%20Fitness/home.html","_self")

    }else if(message.includes ("hello") || message.includes ("hey")) { 
        
         speak("hello sir, what can i help you?")
        
    }else if(message.includes ("who are you")) {
        speak("i am virtual assistant, created by Ram Sir")
        
    }else if (message.includes ("open youtube")) {
        speak("opening youtube...")
        window.open("https://youtube.com/","_blank")
        
    }else if(message.includes ("open google")) {
        
         speak("opening google...")
         window.open("https://google.com/"," blank")
    }else if(message.includes("open instagram")){ 
        speak("Opening instagram...")
    window.open("https://instagram.com/","_blank")
    }else if (message.includes("open calculator")){
         speak("opening calculator..")
        window.open("calculator://")
    }else if(message.includes ("open whatsapp")){ 
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }else if(message.includes("time")){

    let time=new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
    speak(time)
    }else if(message.includes("date")){

        let date=new Date().toLocaleString(undefined, {day: "numeric", month:"short"})
        
        speak(date)
        
    }
    else{
        
        let finalText="this is what i found on internet regarding" + message.replace ("Alexaa","") || message.replace("Alexaa", "")
        
        speak(finalText)
        
        window.open(`https://www.google.com/search?q=${message.replace("Alexaa","")}`,"_blank")
        
    }

}




ai.addEventListener("click", ()=>{
    recognition.start()
    speakpage.classList.add("active-speak-page")
    speakpage.style.display="flex";
    
})


