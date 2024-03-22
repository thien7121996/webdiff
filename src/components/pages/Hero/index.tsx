import Link from 'next/link';

const Hero = () => {
	return (
		<>
			<section
				id="home"
				className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
			>
				<div className="container">
					<div className="-mx-4 flex flex-wrap">
						<div className="w-full px-4">
							<div className="mx-auto max-w-[800px] text-center">
								<h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
									Diff Pharse プロジェクトのフェーズ
								</h1>
								<p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
									Startup はスタートアップおよび SaaS ビジネス Web
									サイト向けの無料の Next.js テンプレートで、Next 13.x と
									Tailwind CSS で構築された完全なビジネス Web
									サイトを立ち上げるために必要なすべての重要なページ、コンポーネント、セクションが付属しています。
								</p>
								<div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
									<Link
										href="/signin"
										className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
									>
										🔥 Sign in
									</Link>
									<Link
										href="/projects"
										className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
									>
										Star on Projects
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Hero;
