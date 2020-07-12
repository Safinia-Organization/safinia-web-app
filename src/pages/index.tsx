import React, { useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "@reach/router"
import qs from "query-string"

import styled from "styled-components"

import Layout from "../components/Layout"
import CircularProgress from "@material-ui/core/CircularProgress"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const SearchPageWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`

const SearchPage = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`
const CaptionText = styled.div`
  color: ${({ theme }): string => theme.mode.text};
  font-weight: 100;
  font-size: 20px;
  text-align: center;
  @media (min-width: 400px) {
    font-size: 24px;
  }
  @media (min-width: 600px) {
    text-align: left;
    font-size: 30px;
  }
`

const JumboText = styled.div`
  color: ${({ theme }): string => theme.mode.text};
  font-weight: 700;
  font-size: 30px;
  text-align: center;
  @media (min-width: 400px) {
    font-size: 40px;
  }
  @media (min-width: 600px) {
    text-align: left;
    font-size: 50px;
  }
`

const SearchContent = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  @media (min-width: 600px) {
    left: auto;
    right: auto;
  }
`

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  transition: ease-in-out 0.2s;
`

const Search = styled.input`
  min-width: 0;
  flex-grow: 1;
  box-shadow: ${({ theme }): string => theme.mode.innerShadow};
  background: ${({ theme }): string => theme.mode.background};
  color: ${({ theme }): string => theme.mode.text};
  border: none;
  &:focus {
    outline: none;
  }
  border-radius: 25px;
  padding: 0 25px;
  font-size: 18px;
  height: 50px;
  margin-right: 10px;
  @media (min-width: 600px) {
    border-radius: 30px;
    padding: 0 30px;
    font-size: 24px;
    height: 60px;
    margin-right: 20px;
  }
`

const SearchButton = styled.button`
  background: ${({ theme }): string => theme.common.palette.brandGradient};
  box-shadow: ${({ theme }): string => theme.common.palette.brandGlow};
  border: none;
  height: 50px;
  border-radius: 25px;
  padding: 0 20px;
  cursor: pointer;
  @media (min-width: 600px) {
    height: 60px;
    border-radius: 30px;
    padding: 0 30px;
  }
  &:active {
    background: ${({ theme }): string =>
      theme.common.palette.brandGradientActive};
  }
`

const SearchResult = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`

const SearchResultContent = styled.div`
  color: ${({ theme }): string => theme.mode.text};
`

const StyledCircularProgress = styled(CircularProgress)`
  color: ${({ theme }): string => theme.common.palette.brand};
  align-self: center;
`

enum FetchState {
  Dormant,
  Requesting,
  Received,
}

interface SearchWrapperProps {
  fetchState: FetchState
}

const SearchWrapper = styled.div<SearchWrapperProps>`
  position: relative;
  margin-top: ${({ fetchState }): string =>
    fetchState === FetchState.Dormant ? "30vh" : "40px"};
  transition: 0.2s ease-in-out;
`
const IndexPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.Dormant)
  const [response, setResponse] = useState<Record<any, any> | null>(null)
  const search = useCallback((): void => {
    if (searchQuery) {
      setFetchState(FetchState.Requesting)
      const queryString = qs.stringify({ search: searchQuery })
      navigate(`?${queryString}`)
    }
  }, [navigate, searchQuery])
  useEffect(() => {
    const urlSearchQuery = qs.parse(location.search)
    if ("search" in urlSearchQuery) {
      if (urlSearchQuery.search) {
        setFetchState(FetchState.Requesting)
        if (typeof urlSearchQuery.search === "string") {
          setSearchQuery(urlSearchQuery.search)
        } else {
          setSearchQuery(urlSearchQuery.search[0])
        }
        fetchSearchResults()
          .then(data => {
            setFetchState(FetchState.Received)
            setResponse(data)
          })
          .catch()
      }
    }
  }, [location])
  // TODO: Aidan implement this method
  const fetchSearchResults = (): Promise<Record<any, any>> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            message:
              "HIV causes AIDS and interferes with the body's ability to fight infections. The virus can be transmitted through contact with infected blood, semen, or vaginal fluids. Within a few weeks of HIV infection, flu-like symptoms such as fever, sore throat, and fatigue can occur. Then the disease is usually asymptomatic until it progresses to AIDS. AIDS symptoms include weight loss, fever or night sweats, fatigue, and recurrent infections. No cure exists for AIDS, but strict adherence to anti-retroviral therapy (ART) can dramatically slow the disease's progress, prevent secondary infections and complications, and prolong life.",
          },
        })
      }, 5000)
    })
  }
  return (
    <Layout>
      <SearchPageWrapper>
        <SearchPage>
          <SearchWrapper fetchState={fetchState}>
            {fetchState === FetchState.Dormant && (
              <SearchContent>
                <CaptionText>Local STI/STD Information</CaptionText>
                <JumboText>Made Accessible.</JumboText>
              </SearchContent>
            )}
            <SearchBar>
              <Search
                autoFocus={true}
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setSearchQuery(e.target.value)
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
                  if (e.keyCode === 13) {
                    search()
                  }
                }}
              />
              <SearchButton onClick={search}>
                <FontAwesomeIcon icon={faSearch} color="white" />
              </SearchButton>
            </SearchBar>
          </SearchWrapper>
          <SearchResult>
            {fetchState === FetchState.Requesting && (
              <StyledCircularProgress color="inherit" size={100} />
            )}
            {fetchState === FetchState.Received && (
              <SearchResultContent>
                {JSON.stringify(response)}
              </SearchResultContent>
            )}
          </SearchResult>
        </SearchPage>
      </SearchPageWrapper>
    </Layout>
  )
}
export default IndexPage
