import { useSearchParams, useNavigate } from "react-router-dom";
import { ChatUsersList } from "../components/users-list";
import { ChatSessionsList } from "../components/sessions-list";
import { ChatView } from "../components/chat-view";

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedUserId = searchParams.get("userId");
  const selectedSessionId = searchParams.get("sessionId");

  const handleSelectUser = (userId: string) => {
    navigate({ search: `?userId=${userId}` }, { replace: true });
  };

  const handleSelectSession = (sessionId: string) => {
    navigate(
      { search: `?userId=${selectedUserId}&sessionId=${sessionId}` },
      { replace: true }
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex border rounded-md overflow-hidden bg-background">
      <div className="w-72 border-r shrink-0">
        <ChatUsersList
          selectedUserId={selectedUserId}
          onSelect={handleSelectUser}
        />
      </div>
      <div className="w-80 border-r shrink-0">
        <ChatSessionsList
          userId={selectedUserId}
          selectedSessionId={selectedSessionId}
          onSelect={handleSelectSession}
        />
      </div>
      <div className="flex-grow min-w-0">
        <ChatView sessionId={selectedSessionId} />
      </div>
    </div>
  );
}
