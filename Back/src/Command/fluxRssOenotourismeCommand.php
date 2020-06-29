<?php


namespace App\Command;

use App\Entity\Oenotourisme;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use SimpleXMLElement;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use \Doctrine\ORM\EntityManager;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Validator\Constraints\DateTime;

class fluxRssOenotourismeCommand extends Command
{
    /**
     *
     * Variable défini pour l'appel de la command
     *
     * @var string
     */
    protected static $defaultName = 'app:rssOenotourisme';

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * fluxRssOenotourismeCommand constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }


    /**
     *
     * Fonction d'éxecution de la command pour la récupération du FluxRss concernant Article et Category.
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return
     * @throws DBALException
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        /** Déclaration de l'entityManager */
        $doctrine = $this->entityManager;
        /** L'url du flux Rss */
        $urlOenotourisme = "https://www.terredevins.com/oenotourisme/feed";
        /** Déclaration d'unenouvelle instance de la classe SimpleXMLElement */
        $xmlOenotourisme = new SimpleXMLElement($urlOenotourisme, null, true);
        /** Retourne les espaces de noms utilisés dans le document */
        $nsOenotourisme = $xmlOenotourisme->getNamespaces(true);
        /** Convertit  fichier XML en objet */
        $fluxRssOenotourisme = simplexml_load_file($urlOenotourisme);
        /** Déclaration d'une variable pour le chemin du flux Rss' */
        $itemsOenotourisme = $fluxRssOenotourisme->channel->item;

        /**
         * Boucle permettant de récupérés chaques items dans la variable
         */
        foreach($itemsOenotourisme as $item ){

            /**
             * Déclaration de chaques objets
             */
            $title = $item->title;
            $link = $item->link;
            $comments = $item->comments;
            $pubDate = $item->pubDate;
            $pubDateFinal = date('Y-m-d',strtotime($pubDate));
            $dc = $item->children($nsOenotourisme['dc']);
            $guid = $item->guid;
            $description = $item->description;
            $content = $item->children($nsOenotourisme['content']);
            $wfw = $item->children($nsOenotourisme['wfw']);
            $slash = $item->children($nsOenotourisme['slash']);

            /**
             * Nouvelle instance d'un Oenotourisme
             */
            $oenotourisme = new Oenotourisme();

            /**
             * Ajout de chaque objet dans l'Oenotourisme
             */
            $oenotourisme->setTitle($title);
            $oenotourisme->setLink($link);
            $oenotourisme->setComments($comments);
            $oenotourisme->setPubDate(new \DateTime($pubDateFinal));
            $oenotourisme->setCreator($dc);
            $oenotourisme->setGuid($guid);
            $oenotourisme->setDescription($description);
            $oenotourisme->setContent($content);
            $oenotourisme->setCommentRss($wfw);
            $oenotourisme->setCommentsSlash($slash);

            /**
             * Persistence des données
             */
            $doctrine->persist($oenotourisme);

            /**
             * Envoi des données sur la Bdd
             */
            $doctrine->flush();
            $output->writeln('Récupération des Oenotourisme !');

        }

        return 0;
    }


}
