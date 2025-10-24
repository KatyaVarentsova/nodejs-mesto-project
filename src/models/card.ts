import {
    model,
    Schema,
    Types
} from 'mongoose';

export interface ICard {
    name: string;
    link: string;
    owner: Types.ObjectId;
    likes: Types.ObjectId[];
    createdAt: Date;
}

const cardSchema = new Schema<ICard>({
    name: {
        type: String,
        required: [true, 'Поле "name" должно быть заполнено'],
        minlength: [2, 'Минимальная длина поля "name" - 2'],
        maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    link: {
        type: String,
        required: [true, 'Поле "link" должно быть заполнено'],
        validate: {
            validator: (link: string) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(link),
            message: 'Поле "link" должно быть валидным URL-адресом',
        },
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false })

export default model<ICard>('Card', cardSchema);