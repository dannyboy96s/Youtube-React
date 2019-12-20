import React, {useState} from 'react';
import './App.css';
import {Grid} from '@material-ui/core';
import youtubeApi from './api/youtubeApi';

import {SearchBar, VideoDetail, VideoList} from './components';

export default () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Grid style={{ justifyContent: "center" }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  async function handleSubmit(searchTerm) {
    const { data: { items: videos } } = await youtubeApi.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: process.env.REACT_APP_API_KEY,
        q: searchTerm,
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }
}
/*class App extends React.Component {

  state = {
    videos: [],
    selectedVideo: null
  }
  handleSubmit = async (searchTerm) => {
    const response = await youtubeApi.get('search', {
      params: {
        part: 'snippet',
        maxResults: '5',
        key: 'remvoved key - using env to hide key',
        q: searchTerm
      }
    
    });
    console.log(response.data.items);

    this.setState({
      video: response.data.items, 
      selectedVideo: response.data.items[0]
    });

  }

  render () {
    const {selectedVideo, videos} = this.state;
    return (
      <Grid justify='center' container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
               <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item xs = {8}>
              <VideoDetail video={selectedVideo}/>
            </Grid>
            <Grid item xs = {4}>
              <VideoList videos={videos}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}



export default App;*/
