export default function MessageBubble({ message }) {
  return (
    <div
      className={`p-2 max-w-xs rounded-lg ${
        message.sender === "me"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      {message.text}
    </div>
  );
}
