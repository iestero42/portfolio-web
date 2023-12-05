import React from 'react'
import * as THREE from 'three';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import './42madrid.css'
import { ProjectCard } from "./ProjectCard";
import logo_3D  from '../../assets/scene.gltf';
import libft from '../../assets/imgs/libft.png';
import get_next_line from '../../assets/imgs/get_next_line.png';
import ft_printf from '../../assets/imgs/ft_printf.png';
import push_swap from '../../assets/imgs/push_swap.png';

function Model() {
  const { nodes, materials } = useGLTF(logo_3D);
  const { camera } = useThree();

  console.log(materials);

  useEffect(() => {
    camera.position.z = 9; // Aleja la cámara
    camera.position.y = 1; // Sube la cámara
    camera.lookAt(nodes['42_logostl'].position); // Hace que la cámara mire al objeto
  }, [camera, nodes]);
  

  useEffect(() => {
    nodes['42_logostl'].rotation.z = THREE.MathUtils.degToRad(90);
    nodes['42_logostl'].rotation.x = THREE.MathUtils.degToRad(-90);
    
  }, [nodes]);

  useFrame(({ clock }) => {
    const color1 = new THREE.Color(0xfe4a1c);
    const color2 = new THREE.Color(0x740000);
    const color3 = new THREE.Color(0x281812);
    const elapsedTime = clock.getElapsedTime() % 3;

    let color;
    if (elapsedTime < 1) {
      // Interpola entre color1 y color2 en el primer segundo
      color = color1.clone().lerp(color2, elapsedTime);
    } else if (elapsedTime < 2) {
      // Interpola entre color2 y color3 en el segundo segundo
      color = color2.clone().lerp(color3, elapsedTime - 1);
    } else {
      // Interpola entre color3 y color1 en el tercer segundo
      color = color3.clone().lerp(color1, elapsedTime - 2);
    }
  
    nodes['42_logostl'].material.emissive.copy(color);

    nodes['42_logostl'].rotation.z = clock.getElapsedTime() * 0.5;

  });

  return <primitive object={nodes['42_logostl']} material={materials.material} />;
}

function Madrid42() {
  const projects_1 = [
    {
      title: "LIBFT",
      description: 'The libft project involves creating a personal C library,' +
                    're-implementing standard C library functions, and adding useful' +
                    'additional ones, to deepen understanding of C and enhance coding efficiency.',
      imgUrl: libft,
      href_repo: "https://github.com/iestero42/libft"
    },
    {
      title: "GET_NEXT_LINE",
      description: 'The get_next_line project is a coding challenge in C that involves' +
                    'writing a function to read and return a line from a file descriptor,' +
                    'efficiently handling memory and multiple file reads.',
      imgUrl: get_next_line,
      href_repo: "https://github.com/iestero42/get_next_line.git"
    },
    {
      title: "FT_PRINTF",
      description: 'The ft_printf project involves replicating the C standard librarys printf' +
                    'function, requiring students to handle various formats and specifiers to output' +
                    'formatted data, thereby enhancing their understanding of variadic functions in C.',
      imgUrl: ft_printf,
      href_repo: "https://github.com/iestero42/ft_printf.git"
    },
  ];

  const projects_2 = [
    {
      title: "PUSH_SWAP",
      description: 'The push_swap project is a coding challenge focused on data sorting algorithms.' +
                    'It involves creating a program in C that sorts numbers using two stacks, optimizing' +
                    'the sorting process with a limited set of operations, thereby sharpening algorithmic' +
                    'and efficiency skills.',
      imgUrl: push_swap,
      href_repo: "https://github.com/iestero42/push_swap.git"
    }
  ];

  return (
    <section>
      <Container fluid className='section-42'>
        <div>
          <Row className='logo-description mb-0'>
            <Col className='item-1'>
              <Canvas style={{ width: "100%", height: "60vh" }}>
                <Model />
              </Canvas>
            </Col>
            <Col className='item-2'>
              <h1 className='color-10'><span style={{color:"white"}}>Understanding</span> <strong>42</strong></h1>
              <p className='description-42'>
              <strong className='color-10'>42 Madrid</strong> is a free programming school open to anyone over 18 years old, 
              without the need for previous programming knowledge. Our learning method is based on peer-to-peer, 
              where students learn to program through practice and collaboration among themselves. 
              The <strong className='color-10'>42 proyect</strong> was born in France in 2013, initiated by entrepreneur Xavier Niel, and has since expanded worldwide.
              In Spain, <strong className='color-10'>42 Madrid</strong> is the first programming school of this kind.
              </p>
            </Col>
          </Row>
          <Row className='project mt-0' id="projects">
          <Col size={12} >
            <TrackVisibility>
              {({ isVisible }) =>
              <div>
                <h2>42 <span className='color-10'>PROYECTS</span></h2>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Circle 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Circle 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Circle 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp">
                    <Tab.Pane eventKey="first">
                      <Row style={{justifyContent: "space-evenly"}}>
                        {
                          projects_1.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row style={{justifyContent: "space-evenly"}}>
                        {
                          projects_2.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Stay tune for new coming proyects</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
        </div>
      </Container>
    </section>
  );
}

export default Madrid42