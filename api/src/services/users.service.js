import { normalizePhone } from "../common/phone.js";
import { UsersRepository } from "../repositories/users.repository.js";

export class UsersService {
  constructor(usersRepository = new UsersRepository()) {
    this.usersRepository = usersRepository;
  }

  findByPhone(phone) {
    return this.usersRepository.findByPhone(normalizePhone(phone));
  }

  upsertVerifiedPhoneUser(phone, role = "CUSTOMER") {
    return this.usersRepository.upsertVerifiedPhoneUser(normalizePhone(phone), role);
  }
}
