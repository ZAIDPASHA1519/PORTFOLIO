const firebaseConfig = {
    apiKey: "AIzaSyALm4mW24Faa3ABli4quRSUuk6aFyA5VU0",
    authDomain: "fir-chat-app-43330.firebaseapp.com",
    projectId: "fir-chat-app-43330",
    storageBucket: "fir-chat-app-43330.firebasestorage.app",
    messagingSenderId: "729989267892",
    appId: "1:729989267892:web:869b7896d160e0fcf6b2e1",
    measurementId: "G-2KY03WQXHN"
  };
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");

sendButton.addEventListener("click", async () => { 
    const message = messageInput.value;
    if (message.trim()) {
        try {
            await db.collection("messages").add({
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            messageInput.value = ''; 
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
});

db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((querySnapshot) => {
        chatMessages.innerHTML = ''; 
        querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageElement = document.createElement("div");
            messageElement.textContent = messageData.text;
            chatMessages.appendChild(messageElement);
        });
    });