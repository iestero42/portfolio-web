import { Col } from "react-bootstrap";



export const ProjectCard = ({ title, description, imgUrl, href_repo }) => {
	return (
	  <Col size={12} sm={6} md={3}>
		<a href={href_repo} target="_blank" rel="noopener noreferrer">
		 <div className="proj-imgbx">
		  <img src={imgUrl} alt=""/>
		  <div className="proj-txtx">
			<h4>{title}</h4>
			<span>{description}</span>
		  </div>
		 </div>
		</a>
	  </Col>
	)
  }