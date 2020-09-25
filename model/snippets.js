const generate = require("nanoid/generate");

module.exports = (mongoose) => {
    const snippetsSchema = mongoose.Schema({
        hash: {
            type: String,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: '7d' },
        },
    },
    {
        timestamps: true
    });

    snippetsSchema.pre("save", async function (next) {
        const generateId = async () => {
            const hash = generate("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6);
            const docs = await mongoose.model("snippets").find({ hash });

            if (!docs.length) return hash;
            return generateId();
        };

        this.hash = await generateId();
        next();
    });

    return mongoose.model("snippets", snippetsSchema);
};