import { UserDetails } from "../../models/user.model";

export class UserDetailsWrapper {
  private constructor(private readonly details: UserDetails) {}

  public static wrap = (details: UserDetails) =>
    new UserDetailsWrapper(details);

  public get model() {
    return this.details;
  }

  public get achievements() {
    return this.details.stats.achievements;
  }
}
