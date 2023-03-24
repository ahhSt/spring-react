import React, { useState } from "react";

import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

import { FaArrowRight, FaAtom, FaServer, FaShieldAlt, FaToolbox } from "react-icons/fa";

export function SideBar() {
	const [sideBar, setSideBar] = useState(false);

	function handleChangeSideBar() {
		setSideBar((prevState) => !prevState);
	}
	return (
		<Container>
			<Content>
				{!sideBar ? (
					<ClosedSideBar>
						<nav>
							<button onClick={handleChangeSideBar}>
								<FaArrowRight />
							</button>

							{/* Links principais do app */}
							<ul>
								<a href="/" title="Alguma coisa">
									<FaAtom />
								</a>
								<a href="/" title="Alguma coisa">
									<FaAtom />
								</a>
								<a href="/" title="Alguma coisa">
									<FaAtom />
								</a>
								<a href="/" title="Alguma coisa">
									<FaAtom />
								</a>
							</ul>
						</nav>
						<div>
							{/* Icones que pode não ser tão principais no app */}
							<ul>
								<a href="/" title="Notificações">
									<FaServer />
								</a>
								<a href="/" title="Configurações">
									<FaShieldAlt />
								</a>
								<a href="/" title="Sair da conta">
									<FaToolbox />
								</a>
							</ul>

						</div>
					</ClosedSideBar>
				) : (
					<OpenSideBar>
						<section>
							<nav>
								<span>
									<button onClick={handleChangeSideBar}>
										<FaArrowRight />
									</button>
								</span>

								{/* Icones principais do app */}
								<ul>
									<a href="/" title="Alguma coisa">
										<FaAtom />
										<p>Alguma coisa</p>
									</a>
									<a href="/" title="Alguma coisa">
										<FaAtom />
										<p>Alguma coisa</p>
									</a>
									<a href="/" title="Alguma coisa">
										<FaAtom />
										<p>Alguma coisa</p>
									</a>
									<a href="/" title="Alguma coisa">
										<FaAtom />
										<p>Alguma coisa</p>
									</a>
								</ul>
							</nav>
							<div>
								{/* Icones que pode não ser tão principais no app */}
								<ul>
									<a href="/">
										<FaServer />
										<p>Notificações</p>
									</a>
									<a href="/">
										<FaShieldAlt />
										<p>Configurações</p>
									</a>
									<a href="/">
										<FaToolbox />
										<p> Sair da conta </p>
									</a>
								</ul>
							</div>
						</section>
						<aside onClick={handleChangeSideBar} />
					</OpenSideBar>
				)}
			</Content>
		</Container>
	);
}
