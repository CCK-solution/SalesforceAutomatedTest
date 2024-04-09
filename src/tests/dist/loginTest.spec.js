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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var test_1 = require("@playwright/test");
var LoginPage_1 = require("../pages/LoginPage");
var CryptojsUtils_1 = require("../utils/CryptojsUtils");
var EncryptEnvFile_1 = require("../utils/EncryptEnvFile");
var LoggerUtils_1 = require("../utils/LoggerUtils");
test_1.test.skip("test", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var loginPage, homePage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loginPage = new LoginPage_1["default"](page);
                    return [4 /*yield*/, loginPage.navigateToLoginPage()];
                case 1:
                    _b.sent();
                    // await loginPage.fillUsername(process.env.userid!); // is due to type constrainsts in typescript
                    // await loginPage.fillPassword(process.env.password!);
                    // encrypted value
                    return [4 /*yield*/, loginPage.fillUsername(CryptojsUtils_1.decrypt(process.env.userid))];
                case 2:
                    // await loginPage.fillUsername(process.env.userid!); // is due to type constrainsts in typescript
                    // await loginPage.fillPassword(process.env.password!);
                    // encrypted value
                    _b.sent(); // is due to type constrainsts in typescript
                    return [4 /*yield*/, loginPage.fillPassword(CryptojsUtils_1.decrypt(process.env.password))];
                case 3:
                    _b.sent();
                    console.log(CryptojsUtils_1.decrypt(process.env.userid));
                    console.log(CryptojsUtils_1.decrypt(process.env.password));
                    return [4 /*yield*/, loginPage.clickLoginButton()];
                case 4:
                    homePage = _b.sent();
                    return [4 /*yield*/, homePage.expectServiceTitleTobeVisible()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test_1.test.skip("simple env test", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            console.log(process.env.NODE_ENV);
            console.log(process.env.userid);
            console.log(process.env.username);
            console.log(process.env.password);
            return [2 /*return*/];
        });
    });
});
test_1.test.skip("test encryption", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            // const plaintext = "Hello, MAMA";
            // const encryptedText = encrypt(plaintext)
            // console.log('SALT:', process.env.SALT);
            // console.log('Encrypted:', encryptedText);
            // const decryptedText = decrypt(encryptedText);
            // console.log('Decrypted:', decryptedText);
            // console.log(decrypt(process.env.userid!));
            // console.log(decrypt(process.env.password!));
            EncryptEnvFile_1.encryptEnvFile();
            return [2 /*return*/];
        });
    });
});
// login using system storage
var authFile = "src/config/auth.json";
//https://www.demoblaze.com/index.html 
test_1.test.skip('login to demoblaze', function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var loginPage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loginPage = new LoginPage_1["default"](page);
                    return [4 /*yield*/, loginPage.navigateToEcomLogin()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, loginPage.navigateToLoginLink()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, loginPage.fillCredentials()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, loginPage.clickLoginbutton()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.context().storageState({ path: authFile })];
                case 5:
                    _b.sent();
                    LoggerUtils_1["default"].info("Auth state is saved");
                    return [2 /*return*/];
            }
        });
    });
});
test_1.test.skip("login with auth file", function (_a) {
    var browser = _a.browser;
    return __awaiter(void 0, void 0, void 0, function () {
        var context, page;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, browser.newContext({ storageState: authFile })];
                case 1:
                    context = _b.sent();
                    return [4 /*yield*/, context.newPage()];
                case 2:
                    page = _b.sent();
                    return [4 /*yield*/, page.goto('https://www.demoblaze.com/')];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, test_1.expect(page.locator('//a[@id="nameofuser"]')).toContainText("Welcome nicolasbahindwa@gmail.com")];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test_1.test("simple loging with self healing", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var loginPage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loginPage = new LoginPage_1["default"](page);
                    return [4 /*yield*/, loginPage.navigateToLoginPage()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, loginPage.fillUsername_selfhealing("demo_selfheal")];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
