export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const isSameSender = (messages, currMessage, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== currMessage.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages,  i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser  = (messages,currMessage, i )=>{
  return i>0 &&  messages[i-1].sender._id === currMessage.sender._id;
}

export const isFirstMessage = (messages, i, currMessage) => {
  return i>0 && messages[i-1].sender._id !== currMessage.sender._id;
}