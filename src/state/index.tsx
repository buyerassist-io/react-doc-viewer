import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
} from 'react';
import { DocViewerProps } from '..';
import {
  MainStateActions,
  setAllDocuments,
  setCurrentDocument,
  setMainConfig,
} from './actions';
import {
  IMainState,
  initialState,
  mainStateReducer,
  MainStateReducer,
} from './reducer';

const DocViewerContext = createContext<{
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  setSelectedDocumentNo: CallableFunction;
}>({
  state: initialState,
  dispatch: () => null,
  setSelectedDocumentNo: () => null,
});

const AppProvider: FC<DocViewerProps> = (props) => {
  const {
    children,
    documents,
    config,
    pluginRenderers,
    currentDocumentNo,
    setSelectedDocumentNo,
  } = props;

  const [state, dispatch] = useReducer<MainStateReducer>(mainStateReducer, {
    ...initialState,
    documents: documents || [],
    currentDocument:
      documents && documents.length ? documents[currentDocumentNo] : undefined,
    currentFileNo: currentDocumentNo,
    config,
    pluginRenderers,
  });

  // On inital load, and whenever they change,
  // replace documents with the new props passed in
  useEffect(() => {
    dispatch(setAllDocuments(documents));
    dispatch(setCurrentDocument(currentDocumentNo));
    config && dispatch(setMainConfig(config));
  }, [documents]);

  return (
    <DocViewerContext.Provider
      value={{ state, dispatch, setSelectedDocumentNo }}
    >
      {children}
    </DocViewerContext.Provider>
  );
};

export { DocViewerContext, AppProvider };
