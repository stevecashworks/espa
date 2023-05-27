import createServiceUI from './createService.js'
const serviceCon=document.querySelector('.services')
const serviceList=[
   {
     name: "Investment Advisory Services",
     description:[
      "Investment advisory services offered by online investment companies are designed to help clients make informed decisions about investing in the stock market. This service typically includes a comprehensive analysis of clients' financial situation, investment objectives, risk tolerance, and time horizon. Based on this analysis, the company provides investment advice and recommendations that are tailored to clients' individual needs.",
      "Investment advisors at online investment companies use various tools and techniques to help clients achieve their investment goals. They use software programs to analyze financial data and market trends, and they conduct thorough research on individual stocks, bonds, and other securities. They also take into account macroeconomic factors such as interest rates, inflation, and political developments that could affect the markets.",
      "In addition to providing investment advice and recommendations, online investment companies also offer ongoing portfolio monitoring and rebalancing. This ensures that clients' portfolios stay aligned with their investment objectives and risk tolerance. Investment advisors use sophisticated algorithms to monitor market conditions and make adjustments to clients' portfolios as necessary to optimize performance.",
     ],
     image:"./assets/illustrations/online investments.png"
     
   },
   {
      name: "Portfolio Management Services",
      description:[
       "Portfolio management services provided by online investment companies aim to maximize returns while minimizing risk. This service involves building a diversified portfolio of stocks, bonds, and other securities that aligns with clients' investment goals and risk tolerance. The company's investment professionals then monitor and manage the portfolio, making adjustments as necessary to optimize performance",
       "The portfolio management process typically begins with a comprehensive analysis of clients' financial situation and investment objectives. Based on this analysis, investment professionals at online investment companies develop a customized investment plan that takes into account clients' individual needs and risk tolerance. They then build a diversified portfolio of securities that is designed to achieve clients' investment goals",
       "Once the portfolio is established, investment professionals monitor market conditions and make adjustments to the portfolio as necessary. This may involve buying or selling securities to maintain the portfolio's target asset allocation, or making other adjustments to optimize performance."
      ],
      image:"./assets/illustrations/portfolio.png"
    },
    {
      name: "Robo-Advisory Services",
      description:[
         "Robo-advisory services are increasingly popular among online investment companies. These services typically offer a low-cost alternative to traditional investment advisory services by using computer algorithms to manage portfolios on behalf of clients",
         "Robo-advisory services typically begin with an assessment of clients' investment goals, risk tolerance, and investment horizon. Based on this assessment, the robo-advisory service will provide a portfolio recommendation that is tailored to the client's individual needs. The recommendation will typically include a mix of stocks, bonds, and other asset classes that are designed to provide a diversified portfolio.",
         "Robo-advisory services typically offer low fees compared to traditional investment advisory services, making them an attractive option for clients who are looking for a low-cost way to invest. In addition, many robo-advisory services offer tax-loss harvesting, which is a strategy that can help clients minimize their tax liability by selling losing investments and using the losses to offset gains.",
         "Overall, robo-advisory services are an increasingly popular way for online investment companies to offer investment management services to clients who are looking for a low-cost, automated approach to investing"
       
      ],
      image:"./assets/illustrations/robo inv.png"
      
    },
    {
      name: "Wealth Management Services",
      description:[
      "Wealth management services provided by online investment companies cater to high-net-worth individuals with complex financial needs. This service typically includes investment advisory and portfolio management services, as well as tax planning, estate planning, and other financial planning services. The company's wealth management professionals work closely with clients to develop a comprehensive financial plan that addresses all aspects of their financial lives",
      "The wealth management process typically begins with a comprehensive analysis of clients' financial situation, including their income, expenses, assets, liabilities, and tax situation. Based on this analysis, wealth management professionals at online investment companies develop a customized financial plan that takes into account clients' individual needs and risk tolerance.",
      "The financial plan developed by wealth management professionals typically includes recommendations for investment advisory and portfolio management" 
      ],
      image:"./assets/illustrations/management.png"

    },

]
const addServices=()=>{
serviceList.forEach(service=>{
   createServiceUI(service,serviceCon)
})
}
export default addServices