import React, { FC, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  nextDocument,
  previousDocument,
  setRendererRect,
} from '../state/actions';
import { IStyledProps } from '../types';
import { useDocumentLoader } from '../utils/useDocumentLoader';
import { useWindowSize } from '../utils/useWindowSize';
import { LinkButton } from './common';
import { LoadingIcon } from './icons';
import { ButtonSecondary } from './common/Button';
import { NextDocIcon, PrevDocIcon } from './icons';

export const ProxyRenderer: FC<{}> = () => {
  const { state, dispatch, CurrentRenderer, setSelectedDocumentNo } =
    useDocumentLoader();
  const { documents, documentLoading, currentDocument, currentFileNo } = state;

  const size = useWindowSize();

  const containerRef = useCallback(
    (node) => {
      node && dispatch(setRendererRect(node?.getBoundingClientRect()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size]
  );

  const gotoPreviousDocument = useCallback(() => {
    dispatch(previousDocument());
    setSelectedDocumentNo(currentFileNo - 1);
  }, [currentFileNo, dispatch, setSelectedDocumentNo]);

  const gotoNextDocument = useCallback(() => {
    dispatch(nextDocument());
    setSelectedDocumentNo(currentFileNo + 1);
  }, [currentFileNo, dispatch, setSelectedDocumentNo]);

  const Contents = () => {
    if (!documents.length) {
      return <div id="no-documents">{/* No Documents */}</div>;
    } else if (documentLoading) {
      return (
        <>
          <ButtonContainer onClick={gotoPreviousDocument}>
            <ButtonPrev id="doc-nav-prev" disabled={currentFileNo === 0}>
              <PrevDocIcon color="#fff" size="60%" />
            </ButtonPrev>
          </ButtonContainer>
          <LoadingContainer
            id="loading-renderer"
            data-testid="loading-renderer"
          >
            <LoadingIconContainer>
              <LoadingIcon color="#444" size={40} />
            </LoadingIconContainer>
          </LoadingContainer>
          <ButtonContainer onClick={gotoNextDocument}>
            <ButtonNext
              id="doc-nav-next"
              disabled={currentFileNo >= documents.length - 1}
            >
              <NextDocIcon color="#fff" size="60%" />
            </ButtonNext>
          </ButtonContainer>
        </>
      );
    } else {
      if (CurrentRenderer) {
        return (
          <>
            <ButtonContainer onClick={gotoPreviousDocument}>
              <ButtonPrev id="doc-nav-prev" disabled={currentFileNo === 0}>
                <PrevDocIcon color="#fff" size="60%" />
              </ButtonPrev>
            </ButtonContainer>
            <CurrentRenderer mainState={state} />
            <ButtonContainer onClick={gotoNextDocument}>
              <ButtonNext
                id="doc-nav-next"
                disabled={currentFileNo >= documents.length - 1}
              >
                <NextDocIcon color="#fff" size="60%" />
              </ButtonNext>
            </ButtonContainer>
          </>
        );
      } else if (CurrentRenderer === undefined) {
        return null;
      } else {
        return (
          <>
            <ButtonContainer onClick={gotoPreviousDocument}>
              <ButtonPrev id="doc-nav-prev" disabled={currentFileNo === 0}>
                <PrevDocIcon color="#fff" size="60%" />
              </ButtonPrev>
            </ButtonContainer>
            <NoRendererContainer id="no-renderer" data-testid="no-renderer">
              <p style={{ marginBottom: 12, textAlign: 'center' }}>
                No Preview Available <br />
                for file type {currentDocument?.fileType}
              </p>
              <DownloadButton
                id="no-renderer-download"
                href={currentDocument?.uri}
                target="_blank"
                download={currentDocument?.uri}
              >
                Download
              </DownloadButton>
            </NoRendererContainer>

            <ButtonContainer onClick={gotoNextDocument}>
              <ButtonNext
                id="doc-nav-next"
                disabled={currentFileNo >= documents.length - 1}
              >
                <NextDocIcon color="#fff" size="60%" />
              </ButtonNext>
            </ButtonContainer>
          </>
        );
      }
    }
  };

  return (
    <Container id="proxy-renderer" ref={containerRef}>
      <Contents />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  background: transparent;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 75px;
  align-items: center;
  justify-content: center;
`;
const spinAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const LoadingIconContainer = styled.div`
  animation-name: ${spinAnim};
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const DownloadButton = styled(LinkButton)`
  width: 130px;
  height: 30px;
  color: white;
  border-radius: 4px;
  background-color: #485cf0;
  @media (max-width: 768px) {
    width: 125px;
    height: 25px;
  }
`;

const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ButtonPrev = styled(ButtonSecondary)`
  width: 30px;
  height: 30px;
  margin: 0 5px 0 10px;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
const ButtonNext = styled(ButtonPrev)`
  margin: 0 10px 0 5px;
`;

const NoRendererContainer = styled.div`
  width: 100%;
  display: flex;
  color: white;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
