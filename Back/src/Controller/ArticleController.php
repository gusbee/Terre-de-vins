<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Category;
use App\Repository\ArticleRepository;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ArticleController
 * @package App\Controller
 */
class ArticleController extends AbstractController
{
    /** @var EntityManagerInterface */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/allarticles", name="allarticles", methods={"GET"})
     * @param ArticleRepository $articleRepository
     * @return Response
     *
     * Description :
     * Récupère tous les articles de la base de donnée pour les retourner sous forme de tableau d'objet au format json
     */
    public function findAllArticle(ArticleRepository $articleRepository)
    {

        $articles = $articleRepository->findAll();
        /** organise les articles sous forme de tableau au format json */
        $data = $this->get('serializer')->serialize($articles, 'json',['groups' => ['article']]);

        $response = new Response($data);
        /** precise dans le header le format "json" */
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/articles/{indice}", name="articles", methods={"GET"})
     * @param ArticleRepository $articleRepository
     * @return Response
     *
     * Description :
     * Récupère tous les articles de la base de donnée pour les retourner sous forme de tableau d'objet au format json
     */
    public function findArticles(ArticleRepository $articleRepository,$indice)
    {

        $articles = $articleRepository->findBy(array(), array('id' => 'DESC'), $indice);
        /** organise les articles sous forme de tableau au format json */
        $data = $this->get('serializer')->serialize($articles, 'json',['groups' => ['article']]);

        $response = new Response($data);
        /** precise dans le header le format "json" */
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/article/{id}", name="article", methods={"GET"})
     * @param Article $article
     * @return Response
     *
     * Description :
     * Retourne un article par son id et retourne un objet json
     */
    public function findOneArticle(Article $article)
    {
        $data = $this->get('serializer')->serialize($article, 'json',['groups' => ['article']]);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/category/{id}/article", name="articlecategory", methods={"GET"}, requirements={"id":"\d+"})
     * @param Article $article
     * @param Category $category
     * @param $id
     * @return Response
     * @throws DBALException
     *
     * Description :
     * Récupéres les articles d'une catégorie pour les retourner sous forme de tableau au format json
     */
    public function findArticlesbyCategory(Article $article,Category $category,$id)
    {

        /** Requete sql pour selectionner les articles qui correspond a la categorie */
        $rawSql = "SELECT article.* FROM `category` 
        LEFT JOIN `article_category` ON `article_category`.`category_id` = `category`.`id`
        LEFT JOIN `article` ON `article_category`.`article_id` = `article`.`id`
        WHERE category.id = $id ";

        /** etablie la connexion avec la base de donnee */
        $stmt = $this->entityManager->getConnection()->prepare($rawSql);
        $stmt->execute([]);

        $resultat = $stmt->fetchAll();
        $data = $this->get('serializer')->serialize($resultat, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}
