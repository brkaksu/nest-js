import { Injectable } from '@nestjs/common';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/model/user.model';

const result: UserModel[] = [];

@Injectable()
export class UserService {

    getHello(): string {
        return 'Hello World!';
    }

    getAllUsers(): UserModel[] {

        if (result.length === 0) {
            this.creatingMockUser(
                {
                    birthDay: new Date(),
                    email: "burakaksu@gmail.com",
                    name: "Burak",
                    surname: "Aksu",
                    password: "123456",
                }
            )
        }
        return result;
    }

    getUserById(id): any{
        const user = result.find(data => data.id == id);

        if(!user){
            return 'User does not exist';
        }else{
            return user;
        }
    }

    createUser(body: UserCreateDto) {
        const isExist = result.find(res => (res.email === body.email))

        if(isExist){
            return isExist;
        }else {
            this.creatingMockUser(body);
            return result.slice(result.length -1, result.length);
        }
    }

    private creatingMockUser(data: any) {
        const user: UserModel = new UserModel();
        user.birthDay = data.birthdate;
        user.email = data.email;
        user.name = data.name;
        user.surname = data.surname;
        user.password = data.password;

        user.id = Math.floor((Math.random() * 60) + 1).toString();

        result.push(user);
    }



}
