import { FluidObject } from 'gatsby-image'
import { ICategory } from '../../../../core/@types/ICategory';

interface ICategoryWithBanner extends ICategory {
  banner: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

export interface IProps {
  pageContext: {
    categories: ICategoryWithBanner[]
  }
}
