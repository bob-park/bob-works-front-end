type Vacation = {
  totalCount: number;
  usedCount: number;
};

type Position = {
  id: number;
  name: string;
};

type Team = {
  id: number;
  name: string;
  description?: string;
};

type User = {
  id: number;
  userId: string;
  email: string;
  name: string;
  position?: Position;
  team: Team;
  avatar?: string;
  nowVacation?: {
    id: number;
    year: number;
    general: Vacation;
    alternative: Vacation;
  };
};

type AuthenticationState = {
  user?: User;
  isLoading: boolean;
};
