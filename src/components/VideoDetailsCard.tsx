interface VideoDetailsProps {
    details?: {"Title": string,
    "Year": string,
    "Rated": string,
    "Released": string,
    "Runtime": string,
    "Genre": string,
    "Director": string,
    "Writer": string,
    "Actors": string,
    "Plot": string,
    "Language": string,
    "Country": string,
    "Awards": string,
    "Poster": string,
    "imdbRating": string,
    "imdbVotes": string,
    "imdbID": string,
    "Type": string,
}
}

const LineWrapper = ({title, text}: {title: string; text: string}) => {
    return(
        <div className="line-wrapper">
            <span className="tag-label">
                {title}: 
            </span>
            <span className="tag-text">{text}</span>
        </div>
    )
}

export const VideoDetailsCard: React.FC<VideoDetailsProps> = ({details}) => {
    if(details){
        const {
            Poster, Title, Year, imdbRating, Actors, Runtime, Genre,
            Director, Language, Plot
        } = details;
    return(
        <div 
            className={`video-details-card`}
            data-testid="video-details-card"
        >
            <div className="display-flex image-wrapper">
                <div className="align-center">
                    <img src={Poster} className="video-details-img" /> 
                </div>
                <div className="video-detials-layout">
                    <h4>{Title}</h4>
                    <LineWrapper title="Year" text={Year} />
                    <LineWrapper title="Imdb Rating" text={imdbRating} />
                    <LineWrapper title="Runtime" text={Runtime} />
                    <LineWrapper title="Genre" text={Genre} />
                    <LineWrapper title="Director" text={Director} />
                    <LineWrapper title="Cast" text={Actors} />
                    
                </div>
            </div>
            <div className="languange-wrapper">
                <LineWrapper title="Language" text={Language} />
                <LineWrapper title="Plot" text={Plot} />
            </div>
        </div>
    )
    }
    return null
}