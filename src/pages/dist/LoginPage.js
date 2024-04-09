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
var HomePage_1 = require("./HomePage");
var LoggerUtils_1 = require("../utils/LoggerUtils");
var selfHealingUtil_1 = require("../utils/selfHealingUtil");
var CryptojsUtils_1 = require("../utils/CryptojsUtils");
var Login = /** @class */ (function () {
    function Login(page) {
        this.page = page;
        this.usernameInputSelector = "#username";
        this.passwordInputSelector = "#password";
        this.loginButtonSelector = "#Login";
        this.AppLuncherLink = ".slds-icon-waffle";
        this.ServicesLink = '//a[@id="07pIU000000sZC8YAM"]';
        // an other login process
        this.loginButton = '#login2';
        this.usernameInput = '#loginusername';
        this.passwordInput = '#loginpassword';
        this.loginSubmitButton = '//button[normalize-space()="Log in"]';
        this.logoutButton = '#logout2';
        // self healing locator.
        this.usernameInputSelectors = ["#username", "input['username']", ".username", "//*[@id='username']"];
    }
    Login.prototype.navigateToLoginPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('/')];
                    case 1:
                        _a.sent();
                        LoggerUtils_1["default"].info("Navigated to login.salesforce.com");
                        return [2 /*return*/];
                }
            });
        });
    };
    Login.prototype.fillUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(this.usernameInputSelector).fill(username)];
                    case 1:
                        _a.sent();
                        LoggerUtils_1["default"].info("UserName has been filled");
                        return [2 /*return*/];
                }
            });
        });
    };
    Login.prototype.fillPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(this.passwordInputSelector).fill(password)];
                    case 1:
                        _a.sent();
                        LoggerUtils_1["default"].info("Password has been filled");
                        return [2 /*return*/];
                }
            });
        });
    };
    Login.prototype.quickLogin = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.navigateToLoginPage()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fillUsername(username)];
                    case 2:
                        _a.sent();
                        LoggerUtils_1["default"].info(username + " has been filled");
                        return [4 /*yield*/, this.fillPassword(password)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.clickLoginButton()];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Login.prototype.clickLoginButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            var homePage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page
                            .locator(this.loginButtonSelector)
                            .click()["catch"](function (error) {
                            LoggerUtils_1["default"].error("Error clicking login button:" + error);
                            console.error("Error clicking login buttin: " + error);
                            throw error; // if error found is thrown
                        })
                            .then(function () { return LoggerUtils_1["default"].info("clicked login button"); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.locator(this.AppLuncherLink).click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.locator(this.ServicesLink).click()];
                    case 3:
                        _a.sent();
                        homePage = new HomePage_1["default"](this.page);
                        return [2 /*return*/, homePage];
                }
            });
        });
    };
    Login.prototype.navigateToEcomLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('https://www.demoblaze.com/index.html')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Login.prototype.navigateToLoginLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(this.loginButton).click()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Login.prototype.fillCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(this.usernameInput).fill(CryptojsUtils_1.decrypt(process.env.email))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.locator(this.passwordInput).fill(CryptojsUtils_1.decrypt(process.env.pwd))];
                    case 2:
                        _a.sent();
                        LoggerUtils_1["default"].info("credentials have been filled up ");
                        return [2 /*return*/];
                }
            });
        });
    };
    Login.prototype.clickLoginbutton = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(this.loginSubmitButton).click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, test_1.expect(this.page).toHaveTitle('STORE')];
                    case 2:
                        _a.sent();
                        LoggerUtils_1["default"].info("user has loggin ");
                        return [2 /*return*/];
                }
            });
        });
    };
    Login.prototype.fillUsername_selfhealing = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var usernameInputLocator, enteredValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, selfHealingUtil_1["default"](this.page, this.usernameInputSelectors)];
                    case 1:
                        usernameInputLocator = _a.sent();
                        return [4 /*yield*/, (usernameInputLocator === null || usernameInputLocator === void 0 ? void 0 : usernameInputLocator.fill(username))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (usernameInputLocator === null || usernameInputLocator === void 0 ? void 0 : usernameInputLocator.inputValue())];
                    case 3:
                        enteredValue = _a.sent();
                        test_1.expect(enteredValue).toBe(username);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Login;
}());
exports["default"] = Login;
