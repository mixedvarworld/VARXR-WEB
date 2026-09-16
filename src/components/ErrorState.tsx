export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="state-card error-state">
      <h3>Something went wrong</h3>
      <p>{message}</p>
    </div>
  );
}