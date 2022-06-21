export interface TaskCompletionService {
  isCompleted(): Promise<boolean>;
}
