import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsDot} from 'react-icons/bs'
import {RiPlayListAddLine} from 'react-icons/ri'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import ReactPlayer from 'react-player'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideNavBar from '../SideNavBar'
import FormattedDate from '../FormattedDate'
import {LoaderContainer} from '../../styledComponents'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoItemDetails: {},
    videoDetailsApiStatus: apiStatusConstants.initial,
    isLikeBtnClicked: false,
    isDislikeBtnClicked: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({videoDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const videoDetailsApi = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videoDetailsApi, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        id: data.video_details.id,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoItemDetails: updatedData,
        videoDetailsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({videoDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  onClickLikeBtn = () => {
    this.setState(prevState => ({
      isLikeBtnClicked: !prevState.isLikeBtnClicked,
      isDislikeBtnClicked: false,
    }))
  }

  onClickDislikeBtn = () => {
    this.setState(prevState => ({
      isDislikeBtnClicked: !prevState.isDislikeBtnClicked,
      isLikeBtnClicked: false,
    }))
  }

  onClickRetryVideoDetails = () => {
    this.getVideoItemDetails()
  }

  render() {
    const {videoItemDetails, isLikeBtnClicked, isDislikeBtnClicked} = this.state
    const {
      videoUrl,
      description,
      title,
      channel,
      viewCount,
      publishedAt,
    } = videoItemDetails
    const likeBtnClassname = isLikeBtnClicked
      ? 'reaction-btn-clicked'
      : 'reaction-btn'

    const dislikeBtnClassname = isDislikeBtnClicked
      ? 'reaction-btn-clicked'
      : 'reaction-btn'
    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            isThemeLight,
            addToSavedVideosList,
            removeFromSavedList,
            savedVideosList,
          } = value

          const renderLightThemeVideoItemDetails = () => {
            const videoIndex = savedVideosList.findIndex(eachItem => {
              if (eachItem.id === videoItemDetails.id) {
                return true
              }
              return false
            })
            let isVideoAlreadySaved = null
            if (videoIndex === -1) {
              isVideoAlreadySaved = false
            } else {
              isVideoAlreadySaved = true
            }
            const onClickSaveBtn = () => {
              if (isVideoAlreadySaved === false) {
                addToSavedVideosList(videoItemDetails)
              } else {
                removeFromSavedList(videoItemDetails)
              }
            }
            const addlistBtnClassname =
              isVideoAlreadySaved === true
                ? 'reaction-btn-clicked'
                : 'reaction-btn'
            const saveBtnText = isVideoAlreadySaved === true ? 'Saved' : 'Save'
            return (
              <div className="video-item-details-bg-container">
                <Header />
                <div className="video-item-details-sidebar-content-container">
                  <SideNavBar />
                  <div className="video-item-content-container">
                    <ReactPlayer
                      controls
                      height="55vh"
                      width="100%"
                      url={videoUrl}
                    />
                    <p>{title}</p>
                    <div className="reaction-container">
                      <div className="reactions">
                        <FormattedDate date={publishedAt} />
                        <BsDot />
                        <p>{viewCount} views</p>
                      </div>
                      <div className="reactions">
                        <div className="like-container">
                          <AiOutlineLike className={likeBtnClassname} />
                          <button
                            type="button"
                            name="like-dislike"
                            className={likeBtnClassname}
                            onClick={this.onClickLikeBtn}
                          >
                            Like
                          </button>
                        </div>
                        <div className="like-container">
                          <AiOutlineDislike className={dislikeBtnClassname} />
                          <button
                            type="button"
                            className={dislikeBtnClassname}
                            onClick={this.onClickDislikeBtn}
                          >
                            DisLike
                          </button>
                        </div>
                        <div className="like-container">
                          <RiPlayListAddLine className={addlistBtnClassname} />
                          <button
                            type="button"
                            onClick={onClickSaveBtn}
                            className={addlistBtnClassname}
                          >
                            {saveBtnText}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="details-container">
                      <div>
                        <img
                          alt="channel logo"
                          className="profile-logo-image"
                          src={channel.profileImageUrl}
                        />
                      </div>
                      <div>
                        <div>
                          <p>{channel.name}</p>
                          <p>{channel.subscriberCount} subscribers</p>
                        </div>
                        <div className="text-container">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          const renderDarkThemeVideoItemDetails = () => {}

          const renderLightThemeVideoItemDetailsFailureView = () => (
            <div className="video-item-details-bg-container">
              <Header />
              <div className="video-item-details-sidebar-content-container">
                <SideNavBar />
                <div className="video-item-content-container">
                  <div className="failure-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                      alt="failure view"
                      className="failure-image"
                    />
                    <h1>Oops! Something Went Wrong</h1>
                    <p>
                      We are having some trouble to complete your request.
                      Please try again.
                    </p>
                    <button
                      onClick={this.onClickRetryVideoDetails}
                      type="button"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )

          const renderLightThemeLoader = () => (
            <div className="video-item-details-bg-container">
              <Header />
              <div className="video-item-details-sidebar-content-container">
                <SideNavBar />
                <div className="video-item-content-container">
                  <LoaderContainer data-testid="loader">
                    <Loader type="ThreeDots" className="loader-container" />
                  </LoaderContainer>
                </div>
              </div>
            </div>
          )

          const renderAllLightThemeVideoItemDetails = () => {
            const {videoDetailsApiStatus} = this.state
            switch (videoDetailsApiStatus) {
              case apiStatusConstants.success:
                return renderLightThemeVideoItemDetails()
              case apiStatusConstants.failure:
                return renderLightThemeVideoItemDetailsFailureView()
              case apiStatusConstants.inProgress:
                return renderLightThemeLoader()
              default:
                return null
            }
          }

          if (isThemeLight === true) {
            return renderAllLightThemeVideoItemDetails()
          }
          return renderDarkThemeVideoItemDetails()
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
