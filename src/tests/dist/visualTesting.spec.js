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
test_1.test("verify logo placement and size", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var logo, boundingBox, expectedWidthInPixels, expectedHeightInPixels;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, page.goto("/")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, page.getByAltText("salesforce")];
                case 2:
                    logo = _b.sent();
                    return [4 /*yield*/, (logo === null || logo === void 0 ? void 0 : logo.boundingBox())];
                case 3:
                    boundingBox = _b.sent();
                    expectedWidthInPixels = 160.890625;
                    expectedHeightInPixels = 112.984375;
                    if (boundingBox) {
                        test_1.expect(boundingBox.width).toBe(expectedWidthInPixels);
                        test_1.expect(boundingBox.height).toBe(expectedHeightInPixels);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
test_1.test("Confirm logo color", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var logo, logoStyle;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, page.goto("/")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, page.getByAltText("salesforce")];
                case 2:
                    logo = _b.sent();
                    return [4 /*yield*/, logo.evaluate(function (element) {
                            var style = window.getComputedStyle(element);
                            return {
                                color: style.color
                            };
                        })];
                case 3:
                    logoStyle = _b.sent();
                    //assert the background color of the button
                    test_1.expect(logoStyle.color).toBe("rgb(22, 50, 92)");
                    return [2 /*return*/];
            }
        });
    });
});
test_1.test('Screenshots', function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var loginPage, screenshot;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // Navigate to the page
                return [4 /*yield*/, page.goto('/')];
                case 1:
                    // Navigate to the page
                    _b.sent();
                    loginPage = new LoginPage_1["default"](page);
                    return [4 /*yield*/, loginPage.fillUsername("demo")];
                case 2:
                    _b.sent();
                    // Set the viewport size to ensure consistent screenshot size
                    return [4 /*yield*/, page.setViewportSize({ width: 1920, height: 1080 })];
                case 3:
                    // Set the viewport size to ensure consistent screenshot size
                    _b.sent();
                    // Take a screenshot
                    return [4 /*yield*/, page.waitForTimeout(5000)];
                case 4:
                    // Take a screenshot
                    _b.sent();
                    return [4 /*yield*/, page.screenshot()];
                case 5:
                    screenshot = _b.sent();
                    // Compare the screenshot with the snapshot
                    test_1.expect(screenshot).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    });
});
