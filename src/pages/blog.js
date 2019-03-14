import React, { Component } from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import BlogPreview from "../components/blog-preview"
import CategoryWildlife from "../components/CategoryWildLife"
import CategoryBird from "../components/CategoryBird"
import { Link,  graphql } from "gatsby"

export class BlogIndex extends Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const post = this.props.data.allContentfulPortfolio.edges
    const birdpost = this.props.data.birdpost.edges
    const Wildlifepost = this.props.data.wildlifepost.edges

    const { pathname } = this.props.location;
    var n = pathname.lastIndexOf('/');

    var pageId = pathname.substring(n + 1);


  
    const page = () => {
      switch(pageId){
        case '': 
          return (
            <div> <ul className="article-list row">
            {post.map(({ node }) => {
              return (
                <li key={node.slug} className="col-lg-4">
                  <BlogPreview blog={node} />
                </li>
              )
            })}
          </ul></div>
          );
        case 'all':
          return (
            <div>    
              lvbkl      
            <ul className="article-list row">
            {post.map(({ node }) => {
              return (
                <li key={node.slug} className="col-lg-4">
                  <BlogPreview blog={node} />
                </li>
              )
            })}
          </ul></div>
          );
        case 'others':
          return (
            <div> <ul className="article-list row">
            {Wildlifepost.map(({ node }) => {
              return (
                <li key={node.slug} className="col-lg-4">
                  <CategoryWildlife blog={node} />
                </li>
              )
            })}
          </ul></div>
          );
        case 'bird':
        return (
          <div>birds <ul className="article-list row">
          {birdpost.map(({ node }) => {
            return (
              <li key={node.slug} className="col-lg-4">
                <CategoryBird blog={node} />
              </li>
            )
          })
          }
        </ul></div>
        );
        default: return(<div>No More Post.!!</div>)
      }
    }

    return (
      <div style={{ background: "#fff" }}>
        <Helmet title={siteTitle} />
        <Layout>
        <div className="container">
      
          <div className="row">    
          <ul>
          <li><Link to="/blog/all">all</Link></li>
          <li><Link to='/blog/bird'>Bird</Link></li>
          <li><Link to='/blog/others'>Others</Link></li>
          </ul>
           {page()}         
          </div> 

        </div>
        </Layout>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
   
        site {
          siteMetadata {
            title
            description
          }
        }
      
        allContentfulPortfolio{
          edges{
            node{    
                blogTitle
                blogShortDesc
                slug         
              blogImage{
                file{
                  url
                }
                fluid(maxWidth: 1800) {
                  ...GatsbyContentfulFluid_noBase64
               }
              }
            }
          }
        }
        birdpost: allContentfulPortfolio(filter:{blogCategoryId:{in:["Birds Photography"]}}){    
          edges{
            node{          
              blogTitle
              blogShortDesc
              slug
              blogCategoryId
              blogImage{
                file{
                  url
                }
                  fluid(maxWidth: 1800) {
                    ...GatsbyContentfulFluid_noBase64
                  }
              }
            }
          }
        }
        wildlifepost : allContentfulPortfolio(filter:{blogCategoryId:{in:["Wildlife Photgraphy"]}}){    
          edges{
            node{          
              blogTitle
              blogShortDesc
              slug
              blogCategoryId
              blogImage{
                file{
                  url
                }
                  fluid(maxWidth: 1800) {
                    ...GatsbyContentfulFluid_noBase64
                  }
              }
            }
          }
        }
  }
`