export const Message = ({ message }) => {
  return (
    <div className="p-4 rounded-xl border-solid border-gray-700 border-2 bg-white flex flex-col gap-6">
      <div>{message.body}</div>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {message.user.name}
      </div>
    </div>
  );
};
