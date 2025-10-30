import {
    Model,
    model,
    Schema,
    Document
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser {
    name: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new Schema<IUser, UserModel>({
    name: {
        type: String,
        minlength: [2, 'Минимальная длина поля "name" - 2'],
        maxlength: [30, 'Максимальная длина поля "name" - 30'],
        default: 'Жак-Ив Кусто',
    },
    about: {
        type: String,
        minlength: [2, 'Минимальная длина поля "about" - 2'],
        maxlength: [200, 'Максимальная длина поля "about" - 200'],
        default: 'Исследователь',
    },
    avatar: {
        type: String,
        validate: {
            validator: (avatar: string) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(avatar),
            message: 'Поле "avatar" должно быть валидным URL-адресом',
        },
        default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (v: string) => validator.isEmail(v),
            message: 'Неправильный формат почты',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Минимальная длина поля "password" - 8'],
        select: false
    },
}, { versionKey: false })

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return user;
    });
  });
});

export default model<IUser, UserModel>('User', userSchema);