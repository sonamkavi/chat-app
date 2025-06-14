import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Alice',
      isOnline: true,
      lastMsg: 'Hey, how are you?',
      messages: [
        { from: 'Alice', text: 'Hey, how are you?', status: 'Received', time: '10:00 AM' },
        { from: 'Me', text: 'I am good!', status: 'Sent', time: '10:01 AM' },
      ],
    },
    {
      id: 2,
      name: 'Bob',
      isOnline: true,
      lastMsg: '',
      messages: [],
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [isTyping, setIsTyping] = useState(false);

  const getBotReply = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) {
      return 'Hi there! How can I help you today?';
    } else if (text.includes('ai')) {
      return 'AI stands for Artificial Intelligence. It simulates human intelligence in machines.';
    } else if (text.includes('name')) {
      return 'My name is ChatBot. Nice to meet you!';
    } else if (text.includes('how are you')) {
      return 'I am just code, but I am running fine!';
    } else if (text.includes('weather')) {
      return 'I can’t check real weather, but I hope it’s sunny!';
    } else {
      return 'Sorry, I didn’t understand that. Can you rephrase?';
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (text) => {
    if (!selectedContact) return;

    const newUserMsg = {
      from: 'Me',
      text,
      status: 'Sent',
      time: getCurrentTime(),
    };

    
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          messages: [...contact.messages, newUserMsg],
          lastMsg: text,
        };
      }
      return contact;
    });

    setContacts(updatedContacts);

    
    const updatedSelectedContact = updatedContacts.find(
      (contact) => contact.id === selectedContact.id
    );
    setSelectedContact(updatedSelectedContact);

    setIsTyping(true);

    setTimeout(() => {
      const replyText = getBotReply(text);

      const botReply = {
        from: selectedContact.name,
        text: replyText,
        status: 'Received',
        time: getCurrentTime(),
      };

      const contactsAfterReply = updatedContacts.map((contact) => {
        if (contact.id === selectedContact.id) {
          return {
            ...contact,
            messages: [...contact.messages, botReply],
            lastMsg: replyText,
          };
        }
        return contact;
      });

      setContacts(contactsAfterReply);

      const updatedSelectedContactAfterReply = contactsAfterReply.find(
        (contact) => contact.id === selectedContact.id
      );
      setSelectedContact(updatedSelectedContactAfterReply);

      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar
          contacts={contacts}
          onSelect={setSelectedContact}
          selected={selectedContact}
        />
        <ChatWindow
          contact={selectedContact}
          onSend={handleSendMessage}
          isTyping={isTyping}
        />
      </div>
    </>
  );
}
