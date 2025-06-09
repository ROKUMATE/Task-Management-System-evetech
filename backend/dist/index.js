"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("trying to connect to db");
            yield mongoose_1.default
                .connect(process.env.MONGODB_URI)
                .then(() => {
                console.log("MongoDB Database has been connected");
                app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
            })
                .catch((err) => {
                console.error("DB connection error", err);
                process.exit(1);
            });
        }
        catch (error) {
            console.log("There was a error in the main()");
            process.exit(1);
        }
    });
}
main();
