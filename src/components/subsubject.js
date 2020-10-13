import React, { Fragment } from "react"
import { graphql, Link, navigate } from "gatsby"
import "../styles/index.css"
import {Collapse} from 'react-bootstrap'
import Layout from "./layout"
import {isLoggedIn} from '../services/auth'
import { useEffect } from 'react'
import { Login } from "./login"
import jQuery from 'jquery'
class SubSubject extends React.Component{
  constructor(props){
    super(props);
    //for context and first video
    // console.log(props)
    var first
    var sect;
    const book = this.props.data.mysqlBooks
    first = book.chapters[0].video;
    if(book.chapters[0].section)
      sect = "Section-A"
    else 
      sect = ""
    this.state = {
      selectedChapterType: 'Chapter-1',
      selectedSectionType: sect,
      selectedQuestionType: first,
      showText: false,
    }
    // window.state ="less";
    this.changeChapter = this.changeChapter.bind(this);
		this.changeSection = this.changeSection.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.toggleText = this.toggleText.bind(this);
		this.renderSelectedChapter = this.renderSelectedChapter.bind(this);
  }

    changeChapter(event){
      this.setState({ selectedChapterType: event.target.value })  
      // console.log("This is chapter selected chapter : ",this.selectedChapterType)
      const book = this.props.data.mysqlBooks
      for(var i=0;i<book.chapters.length;i++)
      {
        if(book.chapters[i].chapter===event.target.value)
        {
          if(book.chapters[i].section)
           { 
            this.setState({ selectedSectionType: "Section-A"})
            // console.log("This is if selected section : ",this.selectedSectionType)
            this.setState({ selectedQuestionType: book.chapters[i].video})
            // console.log("This is if selected question : ",this.selectedQuestionType)
            break;
            }
          else
            {
              this.setState({ selectedSectionType: ""})
              // console.log("This is else selected section : ",this.selectedSectionType)
              this.setState({ selectedQuestionType: book.chapters[i].video})
              // console.log("This is else selected question : ",this.selectedQuestionType)
              break;
           }
      }
      }

    }
// =--------------------------------------------------------------------------------------------------------------------------------------
// =--------------------------------------------------------------------------------------------------------------------------------------
// =--------------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------
  
  changeSection(event){
      // console.log("This is selected chapter : ",this.selectedChapterType)
      var selSection = event.target.value;
      this.setState({ selectedSectionType: selSection})
      var newSec;
      const book = this.props.data.mysqlBooks  
        for(var i=0;i<book.chapters.length;i++){
          if(book.chapters[i].section===selSection && book.chapters[i].chapter===this.state.selectedChapterType)
          {
            newSec=book.chapters[i].video;
            break;
          }
        } 
      this.setState({ selectedQuestionType: newSec})
    }

    changeQuestion(event){
      this.setState({ selectedQuestionType: event.target.value })
    }

    render() {
      // console.log(this.props);
      const book = this.props.data.mysqlBooks
      const files = this.props.data.allFile.edges
      const subject = this.props.pageContext.contValue
        return(
        <>
        <Layout>
            <div className="container-fluid mt-5 w-100 myCon">
             {isLoggedIn() ? (
              <>
              <h2>Video TextBook Solutions</h2>
              {/* --------------------breadcrumbs----------------- */}
              <p className="breadcrumbs">
                <span>
                  <Link style={{textDecoration: 'none !important'}} to="/">Home</Link>
                </span> &gt; &nbsp;
                <span>
                  <Link to={`/app/`+subject} style={{textDecoration: 'none !important'}}>{subject}</Link>
                </span> &gt; &nbsp;
                <span className="activeSpan">
                  {book.name}
                </span>
              </p>
              {/* -----------------breadcrumbs end------------------ */}
                <section className="theVideoDiv" style={{width: "100%"}}>
                  <div className="w-100">
                    <h4>{book.name}</h4>
                    {this.renderChapterSelector(book)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.renderSectionSelector(book,this.state.selectedChapterType)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.renderQuestionSelector(book,this.state.selectedSectionType,this.state.selectedChapterType)}
                  
                    {/* <div className="w-100 mt-5" onContextMenu={(e)=> e.preventDefault()} style={{paddingLeft:"20%"}}> */}
                    <div className="w-100 mt-5" style={{paddingLeft:"20%"}}>
                      {this.renderSelectedChapter(this.state.selectedQuestionType,files,book)}
                    </div>
                
                    {this.renderTranscript(book,this.state.selectedQuestionType)}
                  </div>
                </section>              
              </>
              ):(
                  // redirectTo(`/app/login`)  
                  <>
                   <Login/>
                    {/* {navigate('/app/login')} */}
                  {/* <h4>You are not logged in. Please <Link to="/users" style={{color: "lightblue !important", textDecoration : "underline !important"}}>Sign up</Link> with us or go back to <Link to="/" style={{color: "lightblue !important", textDecoration : "underline !important"}}>the Home</Link></h4> */}
                  </>
                )
            }
              </div>
          </Layout>
          {/* <Footer/> */}
          </>
          )
  }

  renderChapterSelector(book) {
    var list=[],prev;
        book.chapters.forEach(c=>{
        if(c.chapter!==prev)
          {
            list.push(<option value={c.chapter}>{c.chapter}</option>)
          }
        prev=c.chapter
        })
    return (
      <Fragment>
        <label>Chapter &nbsp;&nbsp;&nbsp;&nbsp;</label>
        <select className="form-control"
          onChange={this.changeChapter}>
          {list}
        </select>
        </Fragment>
    );
  }
 
  renderSectionSelector(book,selectedChapterType) {
    var list=[],prev;
    // question.push(b.qno)
    for(var i=0;i<book.chapters.length;i++){
      if(book.chapters[i].chapter===selectedChapterType)
      {
        if(book.chapters[i].section)
        {  book.chapters.forEach(c=>{
          if(c.section!==prev && c.chapter===selectedChapterType)
              {
                list.push(<option value={c.section}>{c.section}</option>)
              }
            prev=c.section
          })
        }
      else list.push(<option value="">---</option>);
      break;
      }  
    }

    return (
      <Fragment>
        <label className="">Section &nbsp;&nbsp;&nbsp;&nbsp;</label>
        <select className="form-control"
          onChange={this.changeSection}>
          {list}
        </select>
        </Fragment>
    );
  }
  renderQuestionSelector(book,selectedSectionType,selectedChapterType) {
     var list=[];
      book.chapters.forEach(c=>{
        // console.log(c.section,selectedSectionType,"////",c.chapter,selectedChapterType)
        if(c.section===selectedSectionType && c.chapter===selectedChapterType)
        {
          list.push(<option value={c.video}>{c.qno}</option>)
        }
      }) 
    return (
      <Fragment>
        <label className="">Question&nbsp;&nbsp;&nbsp;&nbsp; </label>
        <select className="form-control"
          onChange={this.changeQuestion}>
          {list}
        </select>
        </Fragment>
    );
  }

  renderSelectedChapter(selectedQuestionType,files,book) {
    // console.log("Updated section",this.state.selectedChapterType,this.state.selectedSectionType,selectedQuestionType) 
    var hello=[],trscrpt;
    files.forEach(edge => {
      if(edge.node.name === selectedQuestionType)
      {
        hello = edge.node.publicURL;
        // console.log("The data : ",window.hello," and ",this.state.video)
        // if(!this.state.video === window.hello)
        // {
        //   this.setState({video : window.hello})
        // }
        // console.log("Now window.hello: ",window.hello)
      }
    })
    for(var i=0;i<book.chapters.length;i++)
    {
      if(book.chapters[i].video===selectedQuestionType)
      {
        trscrpt=book.chapters[i].transcripts;
      }
    }
    var sec;
    if (this.state.selectedSectionType!=="") 
      sec = (this.state.selectedSectionType+" of")
    else sec = "";
    // this.forceUpdate();
    return (
      <>
        {/* <video id="v" className="thePlayVideo" width="700px" controls controlsList="nodownload" src={hello} /> */}
        {/* <canvas id="canV" width='700px' height='400'></canvas> */}
        <video id="v" className="thePlayVideo" onContextMenu={(e)=> e.preventDefault()} disablePictureInPicture controlsList="nodownload noremoteplayback" width="700px" controls src={hello} />
        {/* <h3><div id = "playPause">Loading content.</div></h3> */}

        <p className="mt-2">This question is from {sec}  {this.state.selectedChapterType}</p>
      </>
      )
  } 
  renderTranscript(book,video){
    var transcript;
    var length=200;
    book.chapters.forEach(c=>{
      if(video===c.video){
        transcript =  c.transcripts;
      }
    })
    // console.log(transcript.length,"length");
    if(transcript.length>length)
    {
      var newStr = transcript.substring(0, length);
      window.removedStr = transcript.substring(length, transcript.length);
    } 
    window.status= "less";
    return(
      <div className="videoTranscript mt-3" style={{marginBottom:"50px",width: "92%"}}>
       <h4>Video Transcript</h4>
        <p>{newStr}
        {/* <Collapse in={this.state.showText}> */}
          {/* <span>{removedStr}</span> */}
          <span id="textArea"></span>
        {/* </Collapse>
        <a onClick={() => this.setState({ showText: !this.state.showText }) }> ....See {this.state.showText ? 'less' : 'more'}</a> */}
        <a id="toggleButton" onClick={this.toggleText} href="javascript:void(0);">...See More</a>
        </p>
      </div>
    )
  }
  
  toggleText=()=>
  {
    // console.log(window.status);
    if (window.status == "less") {
        document.getElementById("textArea").innerHTML=window.removedStr;
        document.getElementById("toggleButton").innerText = "...See Less";
        window.status = "more";
    } else if (window.status == "more") {
        document.getElementById("textArea").innerHTML = "";
        document.getElementById("toggleButton").innerText = "...See More";
        window.status = "less"
    }
}
}
export default SubSubject

export const pageQuery = graphql`
query($theId: Int!){
  mysqlBooks(book_id: { eq: $theId }){
          name
          book_id
          subject_id
          chapters{
            book_id
            chapter
            section
            qno
            video
            transcripts
          }
        }     
    allFile{
      edges{
        node{
          name
          publicURL
        }
      }
    }
  }
`