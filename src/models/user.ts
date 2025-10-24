import {
    model,
    Schema
} from 'mongoose';

export interface IUser {
    name: string;
    about: string;
    avatar: string
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Поле "name" должно быть заполнено'],
        minlength: [2, 'Минимальная длина поля "name" - 2'],
        maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
        type: String,
        required: [true, 'Поле "about" должно быть заполнено'],
        minlength: [2, 'Минимальная длина поля "about" - 2'],
        maxlength: [200, 'Максимальная длина поля "about" - 200'],
    },
    avatar: {
        type: String,
        required: [true, 'Поле "avatar" должно быть заполнено'],
        validate: {
            validator: (avatar: string) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(avatar),
            message: 'Поле "avatar" должно быть валидным URL-адресом',
        }
    }
}, { versionKey: false })

export default model<IUser>('User', userSchema);