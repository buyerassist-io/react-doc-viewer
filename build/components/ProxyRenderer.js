"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyRenderer = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
var actions_1 = require("../state/actions");
var useDocumentLoader_1 = require("../utils/useDocumentLoader");
var useWindowSize_1 = require("../utils/useWindowSize");
var common_1 = require("./common");
var icons_1 = require("./icons");
var Button_1 = require("./common/Button");
var icons_2 = require("./icons");
exports.ProxyRenderer = function () {
    var _a = useDocumentLoader_1.useDocumentLoader(), state = _a.state, dispatch = _a.dispatch, CurrentRenderer = _a.CurrentRenderer, setSelectedDocumentNo = _a.setSelectedDocumentNo;
    var documents = state.documents, documentLoading = state.documentLoading, currentDocument = state.currentDocument, currentFileNo = state.currentFileNo;
    var size = useWindowSize_1.useWindowSize();
    var containerRef = react_1.useCallback(function (node) {
        node && dispatch(actions_1.setRendererRect(node === null || node === void 0 ? void 0 : node.getBoundingClientRect()));
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size]);
    var gotoPreviousDocument = react_1.useCallback(function () {
        dispatch(actions_1.previousDocument());
        setSelectedDocumentNo(currentFileNo - 1);
    }, [currentFileNo, dispatch, setSelectedDocumentNo]);
    var gotoNextDocument = react_1.useCallback(function () {
        dispatch(actions_1.nextDocument());
        setSelectedDocumentNo(currentFileNo + 1);
    }, [currentFileNo, dispatch, setSelectedDocumentNo]);
    var Contents = function () {
        if (!documents.length) {
            return react_1.default.createElement("div", { id: "no-documents" });
        }
        else if (documentLoading) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ButtonContainer, { onClick: gotoPreviousDocument },
                    react_1.default.createElement(ButtonPrev, { id: "doc-nav-prev", disabled: currentFileNo === 0 },
                        react_1.default.createElement(icons_2.PrevDocIcon, { color: "#fff", size: "60%" }))),
                react_1.default.createElement(LoadingContainer, { id: "loading-renderer", "data-testid": "loading-renderer" },
                    react_1.default.createElement(LoadingIconContainer, null,
                        react_1.default.createElement(icons_1.LoadingIcon, { color: "#444", size: 40 }))),
                react_1.default.createElement(ButtonContainer, { onClick: gotoNextDocument },
                    react_1.default.createElement(ButtonNext, { id: "doc-nav-next", disabled: currentFileNo >= documents.length - 1 },
                        react_1.default.createElement(icons_2.NextDocIcon, { color: "#fff", size: "60%" })))));
        }
        else {
            if (CurrentRenderer) {
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ButtonContainer, { onClick: gotoPreviousDocument },
                        react_1.default.createElement(ButtonPrev, { id: "doc-nav-prev", disabled: currentFileNo === 0 },
                            react_1.default.createElement(icons_2.PrevDocIcon, { color: "#fff", size: "60%" }))),
                    react_1.default.createElement(CurrentRenderer, { mainState: state }),
                    react_1.default.createElement(ButtonContainer, { onClick: gotoNextDocument },
                        react_1.default.createElement(ButtonNext, { id: "doc-nav-next", disabled: currentFileNo >= documents.length - 1 },
                            react_1.default.createElement(icons_2.NextDocIcon, { color: "#fff", size: "60%" })))));
            }
            else if (CurrentRenderer === undefined) {
                return null;
            }
            else {
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ButtonContainer, { onClick: gotoPreviousDocument },
                        react_1.default.createElement(ButtonPrev, { id: "doc-nav-prev", disabled: currentFileNo === 0 },
                            react_1.default.createElement(icons_2.PrevDocIcon, { color: "#fff", size: "60%" }))),
                    react_1.default.createElement(NoRendererContainer, { id: "no-renderer", "data-testid": "no-renderer" },
                        react_1.default.createElement("p", { style: { marginBottom: 12, textAlign: 'center' } },
                            "No Preview Available ",
                            react_1.default.createElement("br", null),
                            "for file type ", currentDocument === null || currentDocument === void 0 ? void 0 :
                            currentDocument.fileType),
                        react_1.default.createElement(DownloadButton, { id: "no-renderer-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri, target: "_blank", download: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri }, "Download")),
                    react_1.default.createElement(ButtonContainer, { onClick: gotoNextDocument },
                        react_1.default.createElement(ButtonNext, { id: "doc-nav-next", disabled: currentFileNo >= documents.length - 1 },
                            react_1.default.createElement(icons_2.NextDocIcon, { color: "#fff", size: "60%" })))));
            }
        }
    };
    return (react_1.default.createElement(Container, { id: "proxy-renderer", ref: containerRef },
        react_1.default.createElement(Contents, null)));
};
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  overflow-y: auto;\n  background: transparent;\n"], ["\n  display: flex;\n  flex: 1;\n  overflow-y: auto;\n  background: transparent;\n"])));
var LoadingContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"])));
var spinAnim = styled_components_1.keyframes(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var LoadingIconContainer = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"], ["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"])), spinAnim);
var DownloadButton = styled_components_1.default(common_1.LinkButton)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 130px;\n  height: 30px;\n  color: white;\n  border-radius: 4px;\n  background-color: #485cf0;\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"], ["\n  width: 130px;\n  height: 30px;\n  color: white;\n  border-radius: 4px;\n  background-color: #485cf0;\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"])));
var ButtonContainer = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  height: 100%;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n"], ["\n  height: 100%;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n"])));
var ButtonPrev = styled_components_1.default(Button_1.ButtonSecondary)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var ButtonNext = styled_components_1.default(ButtonPrev)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin: 0 10px 0 5px;\n"], ["\n  margin: 0 10px 0 5px;\n"])));
var NoRendererContainer = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  color: white;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n"], ["\n  width: 100%;\n  display: flex;\n  color: white;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
