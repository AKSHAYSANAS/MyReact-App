import React, { Component } from 'react';

class StaticPage extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = "https://trinitymedia.ai/player/trinity/2900003266/";
    this.instance.appendChild(script);
    }

    render() {
        return (
            <div>
                <div ref={el => (this.instance = el)} />
                <div className="content">akshay</div>
            </div>
        );
    }
}

export default StaticPage;